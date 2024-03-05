package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.CredentialsDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.UserMapper;
import com.toth.akos.nexused.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserDTO login(CredentialsDTO credentialsDTO) {
        User user = userRepository.findByUid(credentialsDTO.uid())
                .orElseThrow(() -> new ApplicationException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.password()), user.getPassword())) {
            return userMapper.toUserDTO(user);
        }
        throw new ApplicationException("Invalid password", HttpStatus.BAD_REQUEST);
    }
}
