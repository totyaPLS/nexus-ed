package com.toth.akos.nexused.controllers;

import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/")
    public String all() {
        return "Good job, the backend works!";
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentDTO>> allStudents() {
        return ResponseEntity.ok(studentService.allStudents());
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<StudentDTO> getStudent(@PathVariable int id) {
        return ResponseEntity.ok(studentService.getStudent(id));
    }
}
