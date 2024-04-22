package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Grade {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "teacher_id")
    private String teacherId;

    @Column(name = "subject_id")
    private int subjectId;

    @Column(name = "class_id")
    private int classId;

    @Column(name = "grade")
    private int gradeValue;

    @Column(name = "weight")
    private double weight;

    @Column(name = "created")
    private LocalDateTime created;

}
