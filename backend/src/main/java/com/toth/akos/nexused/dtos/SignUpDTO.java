package com.toth.akos.nexused.dtos;

import com.toth.akos.nexused.enums.Role;

import java.util.Date;

public record SignUpDTO (
        String firstName,
        String lastName,
        String phone,
        String publicEmail,
        String schoolEmail,
        String school,
        String residence,
        String birthplace,
        Date birthdate,
        Role role,
        char[] password
) {
}
