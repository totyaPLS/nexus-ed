package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.UserMapper;
import com.toth.akos.nexused.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDTO> allStudents() {
        List<User> all = userRepository.findAll();
        return userMapper.toUserDTOs(all);
    }

    public UserDTO getStudent(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Student not found", HttpStatus.NOT_FOUND));
        return userMapper.toUserDTO(user);
    }

    public UserDTO createStudent(UserDTO userDTO) {
        User user = userMapper.toUser(userDTO);
        User createdStudent = userRepository.save(user);
        return userMapper.toUserDTO(createdStudent);
    }

    public UserDTO deleteStudent(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Student not found", HttpStatus.NOT_FOUND));
        userRepository.deleteById(id);
        return userMapper.toUserDTO(user);
    }
}
