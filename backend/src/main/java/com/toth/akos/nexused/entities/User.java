package com.toth.akos.nexused.entities;

import com.toth.akos.nexused.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "system_user")
public class User {
    @Id
    @GenericGenerator(name = "uid", type = com.toth.akos.nexused.util.UserIdGenerator.class)
    @GeneratedValue(generator = "uid")
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

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "online", nullable = false)
    private boolean online;
}
