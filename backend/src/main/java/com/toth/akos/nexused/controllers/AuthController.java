package com.toth.akos.nexused.controllers;

import com.toth.akos.nexused.config.UserAuthProvider;
import com.toth.akos.nexused.dtos.CredentialsDTO;
import com.toth.akos.nexused.dtos.SignUpDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final UserAuthProvider userAuthProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialsDTO) {
        UserDTO userDTO = userService.login(credentialsDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO));
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody SignUpDTO signUpDTO) {
        UserDTO userDTO = userService.register(signUpDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO)); // FIXME: only for test purposes
        return ResponseEntity.created(URI.create("/users/" + userDTO.getUid())).body(userDTO);
    }

}
