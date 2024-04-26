package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Announcement {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "teacher_id")
    private String teacherId;

    @Column(name = "subject_id")
    private Integer subjectId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "published")
    private LocalDateTime published;

    @Column(name = "class_id")
    private Integer classId;

    @OneToOne(mappedBy = "announcement", cascade = CascadeType.ALL)
    private Task task;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "announcement_id")
    private List<Comment> comment;
}
