package com.toth.akos.nexused.controllers;

import com.toth.akos.nexused.dtos.CredentialsDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialsDTO) {
        UserDTO userDTO = userService.login(credentialsDTO);
        return ResponseEntity.ok(userDTO);
    }

}
