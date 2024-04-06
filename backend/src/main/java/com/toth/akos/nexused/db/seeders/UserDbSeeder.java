package com.toth.akos.nexused.db.seeders;

import com.toth.akos.nexused.dtos.SignUpDTO;
import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import com.toth.akos.nexused.enums.Role;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.UserMapper;
import com.toth.akos.nexused.repositories.ClassRepository;
import com.toth.akos.nexused.repositories.UserRepository;
import com.toth.akos.nexused.services.DbLoaderService;
import com.toth.akos.nexused.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@AllArgsConstructor
@Component
@Order(value = 1)
public class UserDbSeeder implements CommandLineRunner {
    private static final Random RANDOM = new Random();
    private static final int USER_AMOUNT = 50;

    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final UserService userService;
    private final DbLoaderService dbLoaderService;
    private final UserMapper userMapper;

    @Override
    public void run(String... args) {
        if (USER_AMOUNT >= 50) {
            loadUserData();
        } else {
            throw new ApplicationException("USER_AMOUNT must be more then 50", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    private void loadUserData() {
        if (userRepository.count() != 0) return;

        registerUser(Role.ADMIN);

        register9A();

        registerFormTeachersAndClasses();
        registerParentsWithStudents();
    }

    private void register9A() {
        ClassSchool savedClass = loadClassData(null, 9, 'A');
        for (int i = 0; i < 30; i++) {
            UserDTO registeredParent = registerUser(Role.PARENT);
            SignUpDTO studentSignUpDTO = dbLoaderService.genUserData(Role.STUDENT);
            StudentDTO studentDTO = userMapper.userDTOToStudentDTO(studentSignUpDTO, savedClass.getId(), registeredParent.getUid());
            userService.createStudent(studentDTO);
        }
    }

    private UserDTO registerUser(Role roleToBeRegistered) {
        SignUpDTO signUpDTO = dbLoaderService.genUserData(roleToBeRegistered);
        return userService.register(signUpDTO);
    }

    private void registerFormTeachersAndClasses() {
        char[] classLetters = {'A', 'B', 'C'};
        for (int classLevel = 9; classLevel <= 12; classLevel++) {
            for (char classLetter : classLetters) {
                if (classLevel == 9 && classLetter == 'A') continue;
                loadClassData(null, classLevel, classLetter);
            }
        }
    }

    private void registerParentsWithStudents() {
        for (int i = 0; i < USER_AMOUNT*0.4; i++) {
            UserDTO registeredParent = registerUser(Role.PARENT);
            List<ClassSchool> classes = classRepository.findAll();
            if(!classes.isEmpty()) {
                int classId = classes.get(RANDOM.nextInt(classes.size())).getId();
                SignUpDTO studentSignUpDTO = dbLoaderService.genUserData(Role.STUDENT);
                StudentDTO studentDTO = userMapper.userDTOToStudentDTO(studentSignUpDTO, classId, registeredParent.getUid());
                userService.createStudent(studentDTO);
            }
        }
    }

    private ClassSchool loadClassData(String formTeacherId, int classLevel, char classLetter) {
        return classRepository.save(new ClassSchool(0, formTeacherId, classLevel, classLetter));
    }
}
