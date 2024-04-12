package com.toth.akos.nexused.services;

import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final AuthService authService;

    public Student getLoggedInStudent() {
        Optional<Student> oStudent = studentRepository.findById(authService.getPrincipalUid());
        if (oStudent.isEmpty()) {
            throw new ApplicationException("Student not found", HttpStatus.NOT_FOUND);
        }

        return oStudent.get();
    }

    public List<Student> getAllByParentId() {
        return studentRepository.findAllByParentId(authService.getPrincipalUid());
    }
}
