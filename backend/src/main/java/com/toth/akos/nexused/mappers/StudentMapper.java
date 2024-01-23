package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.entities.Student;
import org.mapstruct.Mapper;

import java.util.List;

    @Mapper(componentModel = "spring")
    public interface StudentMapper {
        Student toStudent(StudentDTO studentDTO);

        StudentDTO toStudentDTO(Student student);

        List<StudentDTO> toStudentDTOs(List<Student> students);
    }
