package com.toth.akos.nexused.db.seeders;

import com.toth.akos.nexused.dtos.SignUpDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import com.toth.akos.nexused.entities.Subject;
import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.enums.Role;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.UserMapper;
import com.toth.akos.nexused.repositories.ClassRepository;
import com.toth.akos.nexused.repositories.SubjectRepository;
import com.toth.akos.nexused.repositories.TeachingRepository;
import com.toth.akos.nexused.repositories.UserRepository;
import com.toth.akos.nexused.services.DbLoaderService;
import com.toth.akos.nexused.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Component
@Order(value = 3)
public class TeacherDbSeeder implements CommandLineRunner {
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final TeachingRepository teachingRepository;
    private final ClassRepository classRepository;
    private final DbLoaderService dbLoaderService;
    private final UserService userService;
    private final UserMapper userMapper;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByRole(Role.TEACHER).isPresent()) return;
        registerTeachers();
        assignFormTeachers();
    }

    private UserDTO registerUser(Role roleToBeRegistered) {
        SignUpDTO signUpDTO = dbLoaderService.genUserData(roleToBeRegistered);
        return userService.register(signUpDTO);
    }

    private void registerTeachers() {
        List<Subject> subjects = subjectRepository.findAll();

        List<Subject> subjectsFirstHalf = getHalfOfArray(subjects, true);
        seedTeachings(subjectsFirstHalf, true);

        List<Subject> subjectsSecondHalf = getHalfOfArray(subjects, false);
        seedTeachings(subjectsSecondHalf, false);
    }

    private void seedTeachings(List<Subject> subjects, boolean withNewTeachers) {
        List<User> teachers = new ArrayList<>();
        if (!withNewTeachers) {
            teachers = userRepository.findAllByRole(Role.TEACHER);
        }

        for (int i = 0; i < subjects.size(); i+=2) {
            UserDTO teacher;
            if (withNewTeachers) {
                teacher = registerUser(Role.TEACHER);
            } else {
                teacher = userMapper.toUserDTO(teachers.get(i/2));
            }

            List<ClassSchool> classes = classRepository.findAllByClassLevel(subjects.get(i).getClassDifficulty());
            for (ClassSchool aClass : classes) {
                teachingRepository.save(
                        new Teaching(0, teacher.getUid(), subjects.get(i).getId(), aClass.getId())
                );
            }

            if (i == subjects.size()) break;
            classes = classRepository.findAllByClassLevel(subjects.get(i+1).getClassDifficulty());
            for (ClassSchool aClass : classes) {
                teachingRepository.save(
                        new Teaching(0, teacher.getUid(), subjects.get(i+1).getId(), aClass.getId())
                );
            }
        }
    }

    private <T> List<T> getHalfOfArray(List<T> array, boolean isFirstHalf) {
        int size = array.size();
        int startIndex = isFirstHalf ? 0 : size / 2;
        int endIndex = isFirstHalf ? size / 2 : size;
        return array.subList(startIndex, endIndex);
    }

    private void assignFormTeachers() {
        if (userRepository.countByRole(Role.TEACHER) < classRepository.count()) {
            throw new ApplicationException("Not enough teacher to align to classes", HttpStatus.BAD_REQUEST);
        }

        List<ClassSchool> classes = classRepository.findAll();
        List<User> teachers = userRepository.findAllByRole(Role.TEACHER);
        for (int i = 0; i < classes.size(); i++) {
            classes.get(i).setFormTeacherId(teachers.get(i).getUid());
            classRepository.save(classes.get(i));
        }
    }
}
