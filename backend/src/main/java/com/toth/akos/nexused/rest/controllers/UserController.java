package com.toth.akos.nexused.rest.controllers;

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

    @GetMapping("/users/{uid}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String uid) {
        return ResponseEntity.ok(userService.getUser(uid));
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
}
