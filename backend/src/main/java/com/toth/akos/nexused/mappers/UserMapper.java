package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserDTO userDTO);
    UserDTO toUserDTO(User user);
    List<UserDTO> toUserDTOs(List<User> users);
}
