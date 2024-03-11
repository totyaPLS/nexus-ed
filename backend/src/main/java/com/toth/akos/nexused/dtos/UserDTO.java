package com.toth.akos.nexused.dtos;

import com.toth.akos.nexused.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String uid;
    private String firstName;
    private String lastName;
    private String phone;
    private String publicEmail;
    private String schoolEmail;
    private String school;
    private String residence;
    private String birthplace;
    private Date birthdate;
    private Role role;
    private boolean online;
    private String token;
}
