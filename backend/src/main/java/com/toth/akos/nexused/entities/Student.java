package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter
@Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    @Column
    private String surname;
    @Column
    private String lastName;
    /*@Column
    private String residence;
    @Column
    private String birthplace;
    @Column
    private LocalDate dateOfBirth;
    @Column
    private String educationalInstitution;
    @Column
    private String schoolClass;
    @Column
    private String schoolSubClass;
    @Column
    private String role;
    @Column
    private String officialEmail;
    @Column
    private String publicEmail;
    @Column
    private String workPhoneNumber;
    @Column
    private String publicPhoneNumber;*/
}
