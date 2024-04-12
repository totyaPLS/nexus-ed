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
public class Absence {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "lesson_id")
    private int lessonId;

    @Column(name = "class_id")
    private int classId;

    @Column(name = "subject_id")
    private int subjectId;

    @Column(name = "status")
    private String status;

    @Column(name = "modification_date")
    private LocalDateTime modificationDate;
}
