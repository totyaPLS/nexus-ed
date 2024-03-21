package com.toth.akos.nexused.dtos;

import com.toth.akos.nexused.enums.Role;

import java.time.LocalDate;

public record SignUpDTO (
        String firstName,
        String lastName,
        String phone,
        String publicEmail,
        String schoolEmail,
        String school,
        String residence,
        String birthplace,
        LocalDate birthdate,
        Role role,
        char[] password
) {
}
