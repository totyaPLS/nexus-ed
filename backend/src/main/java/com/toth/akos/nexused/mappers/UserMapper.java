package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.SignUpDTO;
import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.dtos.TeacherDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    User toUser(UserDTO userDTO);

    UserDTO toUserDTO(User user);

    List<UserDTO> toUserDTOs(List<User> users);

    @Mapping(target = "password", ignore = true)
    User signUpDTOToUser(SignUpDTO signUpDTO);

    SignUpDTO teacherDTOToSignUpDTO(TeacherDTO teacherDTO);

    SignUpDTO studentDTOToSignUpDTO(StudentDTO studentDTO);

    @Mapping(target = "classId", source = "classId")
    @Mapping(target = "parentId", source = "parentId")
    StudentDTO userDTOToStudentDTO(SignUpDTO signUpDTO, int classId, String parentId);
}
