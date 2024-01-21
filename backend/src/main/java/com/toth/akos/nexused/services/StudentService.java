package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.exceptions.ApplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class StudentService {
    private final List<StudentDTO> students = Arrays.asList(
            new StudentDTO(
                    1,
                    "Hegedűs",
                    "Virág",
                    "Szeged",
                    "Szeged",
                    LocalDate.of(2002, 1, 18),
                    "Szegedi Baptista Gimnázium és Technikum",
                    "11",
                    "A",
                    "student",
                    "virag.hegedus@szbgt.com",
                    "virag.hegedus@gmail.com",
                    "+36201234567",
                    "+362032165487"),
            new StudentDTO(
                    2,
                    "Baka",
                    "András",
                    "Szeged",
                    "Budapest",
                    LocalDate.of(2005, 4, 22),
                    "Szegedi Baptista Gimnázium és Technikum",
                    "10",
                    "B",
                    "student",
                    "andras.baka@szbgt.com",
                    "andras.baka@gmail.com",
                    "+367012345678",
                    "+367032165487")
    );

    public List<StudentDTO> allStudents() {
        return students;
    }

    public StudentDTO getStudent(int id) {
        return students.stream().filter(student -> id == student.getId())
                .findFirst()
                .orElseThrow(() -> new ApplicationException("Student not found", HttpStatus.NOT_FOUND));
    }
}
