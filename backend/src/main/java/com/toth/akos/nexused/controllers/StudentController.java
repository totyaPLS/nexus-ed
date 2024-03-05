package com.toth.akos.nexused.controllers;

import com.toth.akos.nexused.dtos.UserDTO;
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
    public ResponseEntity<List<UserDTO>> allStudents() {
        return ResponseEntity.ok(studentService.allStudents());
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<UserDTO> getStudent(@PathVariable String id) {
        return ResponseEntity.ok(studentService.getStudent(id));
    }

    @PostMapping("/students")
    public ResponseEntity<UserDTO> createStudent(@Valid @RequestBody UserDTO studentDTO) {
        UserDTO createdStudent = studentService.createStudent(studentDTO);
        return ResponseEntity.created(URI.create("/students/" + createdStudent.getUid())).body(createdStudent);
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<UserDTO> deleteStudent(@PathVariable String id) {
        return ResponseEntity.ok(studentService.deleteStudent(id));
    }
}
