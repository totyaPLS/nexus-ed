package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter
@Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private int id;

    @Column
    private String firstName;

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
