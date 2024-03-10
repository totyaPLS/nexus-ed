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
public class UserController {
    private final StudentService studentService;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> allStudents() {
        return ResponseEntity.ok(studentService.allStudents());
    }

    @GetMapping("/users/{uid}")
    public ResponseEntity<UserDTO> getStudent(@PathVariable String uid) {
        return ResponseEntity.ok(studentService.getStudent(uid));
    }

    @PostMapping("/users")
    public ResponseEntity<UserDTO> createStudent(@Valid @RequestBody UserDTO studentDTO) {
        UserDTO createdStudent = studentService.createStudent(studentDTO);
        return ResponseEntity.created(URI.create("/students/" + createdStudent.getUid())).body(createdStudent);
    }

    @DeleteMapping("/users/{uid}")
    public ResponseEntity<UserDTO> deleteStudent(@PathVariable String uid) {
        return ResponseEntity.ok(studentService.deleteStudent(uid));
    }
}
