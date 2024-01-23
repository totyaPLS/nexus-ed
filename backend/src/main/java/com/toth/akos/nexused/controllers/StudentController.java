package com.toth.akos.nexused.controllers;

import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.services.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
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

    @PostMapping("/students")
    public ResponseEntity<StudentDTO> createStudent(@Valid @RequestBody StudentDTO studentDTO) {
        StudentDTO createdStudent = studentService.createStudent(studentDTO);
        return ResponseEntity.created(URI.create("/students/" + createdStudent.getId())).body(createdStudent);
    }
}
