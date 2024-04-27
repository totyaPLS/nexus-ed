package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.dtos.TeacherDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> allUsers() {
        return ResponseEntity.ok(userService.allUsers());
    }

    @GetMapping("/loggedInUser")
    public ResponseEntity<UserDTO> getLoggedInUser() {
        return ResponseEntity.ok(userService.getLoggedInUser());
    }

    @GetMapping("/student-users/{classId}")
    public ResponseEntity<List<UserDTO>> studentUsersByClassId(@PathVariable Integer classId) {
        return ResponseEntity.ok(userService.studentUsersByClassId(classId));
    }

    @PostMapping("/users")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.created(URI.create("/users/" + createdUser.getUid())).body(createdUser);
    }

    @DeleteMapping("/users/{uid}")
    public ResponseEntity<UserDTO> deleteUser(@PathVariable String uid) {
        return ResponseEntity.ok(userService.deleteUser(uid));
    }

    @PostMapping("/teacher")
    public ResponseEntity<UserDTO> createStudent(@Valid @RequestBody TeacherDTO teacherDTO) {
        UserDTO createdTeacher = userService.createTeacher(teacherDTO);
        return ResponseEntity.created(URI.create("/users/" + createdTeacher.getUid())).body(createdTeacher);
    }

    @PostMapping("/student")
    public ResponseEntity<UserDTO> createStudent(@Valid @RequestBody StudentDTO studentDTO) {
        UserDTO createdStudent = userService.createStudent(studentDTO);
        return ResponseEntity.created(URI.create("/users/" + createdStudent.getUid())).body(createdStudent);
    }

}
