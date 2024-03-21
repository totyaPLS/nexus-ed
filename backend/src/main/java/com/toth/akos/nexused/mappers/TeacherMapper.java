package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.Teacher;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeacherMapper {
    Teacher toTeacher(UserDTO userDTO);
}
