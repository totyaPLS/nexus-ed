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
import java.util.List;
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
            studentRepository.save(new Student(user.getUid(), signUpDTO.classId(), signUpDTO.parentid()));
        }

        if (savedUser.getRole() == Role.TEACHER) {
            teacherRepository.save(new Teacher(user.getUid()));
        }

        return userMapper.toUserDTO(savedUser);
    }

    public List<UserDTO> allUsers() {
        List<User> all = userRepository.findAll();
        return userMapper.toUserDTOs(all);
    }

    public UserDTO getUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Student not found", HttpStatus.NOT_FOUND));
        return userMapper.toUserDTO(user);
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toUser(userDTO);
        User createdStudent = userRepository.save(user);
        return userMapper.toUserDTO(createdStudent);
    }

    public UserDTO deleteUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Student not found", HttpStatus.NOT_FOUND));
        userRepository.deleteById(id);
        return userMapper.toUserDTO(user);
    }
}
