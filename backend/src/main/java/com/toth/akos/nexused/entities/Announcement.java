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
public class Announcement {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "teacher_id")
    private String teacherId;

    @Column(name = "subject_id")
    private int subjectId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "published")
    private LocalDateTime published;

    @Column(name = "class_id")
    private int classId;

    @OneToOne
    @JoinColumn(name = "id")
    private Task task;
}
