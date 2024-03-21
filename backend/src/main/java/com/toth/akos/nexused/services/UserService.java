package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.CredentialsDTO;
import com.toth.akos.nexused.dtos.SignUpDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.entities.Teacher;
import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.enums.Role;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.UserMapper;
import com.toth.akos.nexused.repositories.StudentRepository;
import com.toth.akos.nexused.repositories.TeacherRepository;
import com.toth.akos.nexused.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
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

    public UserDTO register(SignUpDTO signUpDTO) {
        Optional<User> oUser = userRepository.findByUid(signUpDTO.publicEmail());

        if (oUser.isPresent()) {
            throw new ApplicationException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpDTOToUser(signUpDTO);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDTO.password())));
        User savedUser = userRepository.save(user);

        if (savedUser.getRole() == Role.STUDENT) {
            Optional<User> aParent = userRepository.findByRole(Role.PARENT); // FIXME: an exact parent id will come instead of this
            if (aParent.isPresent()) {
                studentRepository.save(new Student(user.getUid(), 1, aParent.get().getUid()));
            }
        }

        if (savedUser.getRole() == Role.TEACHER) {
            teacherRepository.save(new Teacher(user.getUid()));
        }

        return userMapper.toUserDTO(savedUser);
    }
}
