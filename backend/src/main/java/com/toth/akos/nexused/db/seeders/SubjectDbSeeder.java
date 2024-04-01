package com.toth.akos.nexused.db.seeders;

import com.toth.akos.nexused.entities.Subject;
import com.toth.akos.nexused.repositories.SubjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Component
@Order(value = 2)
public class SubjectDbSeeder implements CommandLineRunner {
    private final SubjectRepository subjectRepository;

    @Override
    public void run(String... args) throws Exception {
        if (subjectRepository.count() != 0) return;

        List<Subject> subjects = new ArrayList<>();
        String[] subjectNames = {
                "Magyar nyelv és irodalom",
                "Angol nyelv",
                "Német nyelv",
                "Matematika",
                "Történelem",
                "Fizika",
                "Kémia",
                "Biológia",
                "Informatika",
                "Testnevelés és sport",
                "Földrajz",
                "Ének-zene",
                "Vizuális kultúra",
                "Irodalom"
        };

        for (String subjectName : subjectNames) {
            for (int classDiff = 9; classDiff <= 12; classDiff++) {
                subjects.add(new Subject(0, subjectName, classDiff));
            }
        }

        subjectRepository.saveAll(subjects);
    }
}
