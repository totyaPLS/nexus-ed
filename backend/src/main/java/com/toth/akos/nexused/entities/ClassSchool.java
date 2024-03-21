package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "class", schema = "public", catalog = "d6tbqrvqbt9o2m")
public class ClassSchool {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "form_teacher_id")
    private String formTeacherId;

    @Column(name = "class_level")
    private int classLevel;

    @Column(name = "letter")
    private char letter;
}
