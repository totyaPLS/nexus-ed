package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.entities.Student;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StudentMapper {
    Student studentDTOToStudent(StudentDTO studentDTO);

    StudentDTO toStudentDTO(Student student);
}
