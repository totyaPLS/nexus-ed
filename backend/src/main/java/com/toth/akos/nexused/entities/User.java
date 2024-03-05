package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "system_user")
public class User {
    @Id
    @Column(name = "uid")
    private String uid;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "public_email")
    private String publicEmail;

    @Column(name = "school_email")
    private String schoolEmail;

    @Column(name = "school")
    private String school;

    @Column(name = "residence")
    private String residence;

    @Column(name = "birthplace")
    private String birthplace;

    @Column(name = "birthdate")
    private Date birthdate;

    @Column(name = "is_admin", nullable = false)
    private boolean admin;

    @Column(name = "is_student", nullable = false)
    private boolean student;

    @Column(name = "is_teacher", nullable = false)
    private boolean teacher;

    @Column(name = "is_form_teacher", nullable = false)
    private boolean formTeacher;

    @Column(name = "online", nullable = false)
    private boolean online;
}
