package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.StudentMapper;
import com.toth.akos.nexused.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public List<StudentDTO> allStudents() {
        List<Student> all = studentRepository.findAll();
        return studentMapper.toStudentDTOs(all);
    }

    public StudentDTO getStudent(int id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Student not found", HttpStatus.NOT_FOUND));
        return studentMapper.toStudentDTO(student);
    }

    public StudentDTO createStudent(StudentDTO studentDTO) {
        Student student = studentMapper.toStudent(studentDTO);
        Student createdStudent = studentRepository.save(student);
        return studentMapper.toStudentDTO(createdStudent);
    }

    public StudentDTO deleteStudent(int id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Student not found", HttpStatus.NOT_FOUND));
        studentRepository.deleteById(id);
        return studentMapper.toStudentDTO(student);
    }
}
