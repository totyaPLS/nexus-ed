package com.toth.akos.nexused.dataloader;

import com.toth.akos.nexused.entities.ClassSchool;
import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.enums.Role;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.repositories.ClassRepository;
import com.toth.akos.nexused.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.List;

@AllArgsConstructor
@Order(value = 1)
@Component
public class ClassDataLoader implements CommandLineRunner {

    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws ApplicationException {
        loadClassData();
    }

    private void loadClassData() {
        List<User> formTeachers = userRepository.findAllByRole(Role.FORM_TEACHER);
        if (formTeachers.size() < 12) {
            throw new ApplicationException("Not enough Form teachers for creating classes: " + formTeachers.size(), HttpStatus.NOT_FOUND);
        }

        char[] classLetters = {'A', 'B', 'C'};

        int formTeacherIndex = 0;
        for (int classLevel = 9; classLevel <= 12; classLevel++) {
            for (char classLetter : classLetters) {
                classRepository.save(new ClassSchool(0, formTeachers.get(formTeacherIndex).getUid(), classLevel, classLetter));
            }
        }
    }
}
