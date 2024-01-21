package com.toth.akos.nexused.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter
@Setter
public class StudentDTO {
    @NotNull
    private int id;
    private String surname;
    private String lastName;
    private String residence;
    private String birthplace;
    private LocalDate dateOfBirth;
    private String educationalInstitution;
    private String schoolClass;
    private String schoolSubClass;
    private String role;
    private String officialEmail;
    private String publicEmail;
    private String workPhoneNumber;
    private String publicPhoneNumber;
}
