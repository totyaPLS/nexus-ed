package com.toth.akos.nexused.controllers;

import com.toth.akos.nexused.dtos.CredentialsDTO;
import com.toth.akos.nexused.dtos.SignUpDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Yeee Backend works!");
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialsDTO) {
        UserDTO userDTO = userService.login(credentialsDTO);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody SignUpDTO signUpDTO) {
        UserDTO userDTO = userService.register(signUpDTO);
        return ResponseEntity.created(URI.create("/users/" + userDTO.getUid())).body(userDTO);
    }

}
