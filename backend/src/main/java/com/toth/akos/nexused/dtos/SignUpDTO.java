package com.toth.akos.nexused.dtos;

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
        boolean admin,
        boolean student,
        boolean teacher,
        boolean formTeacher,
        char[] password
) {
}
