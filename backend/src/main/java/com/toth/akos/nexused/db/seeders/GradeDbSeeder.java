package com.toth.akos.nexused.db.seeders;

import com.toth.akos.nexused.entities.Grade;
import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.repositories.GradeRepository;
import com.toth.akos.nexused.services.ClassService;
import com.toth.akos.nexused.services.StudentService;
import com.toth.akos.nexused.services.SubjectService;
import com.toth.akos.nexused.services.TeachingService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@AllArgsConstructor
@Component
@Order(value = 5)
public class GradeDbSeeder implements CommandLineRunner {

    private final GradeRepository gradeRepository;
    private final ClassService classService;
    private final SubjectService subjectService;
    private final StudentService studentService;
    private final TeachingService teachingService;

    private static final Random RANDOM = new Random();

    @Override
    public void run(String... args) {
        if (gradeRepository.count() != 0) return;
        seedGradeDb();
    }

    // Seeding Db only with class 9.A
    private void seedGradeDb() {
        int classId = classService.getClassByLevelAndLetter(9, 'A').id();
        int subjectId = subjectService.getSubjectIdByNameAndDifficulty("Magyar nyelv és irodalom", 9);
        List<Student> students = studentService.getAllByClassId(classId);
        String teacherId = teachingService.getTeacherIdBySubjectAndClass(subjectId, classId);

        double[] weights = {0.5, 1.0, 2.0};
        List<Grade> grades = new ArrayList<>();
        for (Student student : students) {
            LocalDateTime startDate = LocalDateTime.of(2023, Month.SEPTEMBER, 1, 0, 0);
            LocalDateTime endDate = LocalDateTime.of(2024, Month.JULY, 1, 0, 0);

            // Iterate through the months
            LocalDateTime currentMonth = startDate;
            while (currentMonth.isBefore(endDate)) {
                for (int i = 0; i < 5; i++) {
                    int randomIndex = RANDOM.nextInt(weights.length);
                    double randomWeight = weights[randomIndex];
                    int randomGrade = RANDOM.nextInt(5) + 1;
                    grades.add(
                            new Grade(
                                    0, student.getId(), teacherId, subjectId,
                                    classId, randomGrade, randomWeight, currentMonth
                            )
                    );
                }
                currentMonth = currentMonth.plusMonths(1);
            }
        }
        gradeRepository.saveAll(grades);
    }
}
