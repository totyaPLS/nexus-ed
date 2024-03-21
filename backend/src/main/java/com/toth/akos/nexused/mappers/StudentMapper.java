package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    Student toStudent(UserDTO userDTO);
}
