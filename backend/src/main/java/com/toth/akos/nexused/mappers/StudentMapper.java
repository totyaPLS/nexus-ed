package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.entities.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    Student studentDTOToStudent(StudentDTO studentDTO);

    StudentDTO toStudentDTO(Student student);
}
