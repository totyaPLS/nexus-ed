package com.toth.akos.nexused.dtos;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter
@Setter
public class StudentDTO {
    private int id;
    private String firstName;
    private String lastName;
    /*private String residence;
    private String birthplace;
    private LocalDate dateOfBirth;
    private String educationalInstitution;
    private String schoolClass;
    private String schoolSubClass;
    private String role;
    private String officialEmail;
    private String publicEmail;
    private String workPhoneNumber;
    private String publicPhoneNumber;*/
}
