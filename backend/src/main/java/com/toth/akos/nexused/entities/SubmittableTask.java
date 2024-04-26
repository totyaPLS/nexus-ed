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
@Table(name = "submittable_task")
public class SubmittableTask {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "grade_id")
    private Integer gradeId;

    @Column(name = "task_id")
    private int taskId;

    @Column(name = "graded")
    private LocalDateTime graded;

    @Column(name = "text")
    private String text;

    @Column(name = "submitted")
    private LocalDateTime submitted;

    @ManyToOne
    @JoinColumn(name = "student_id", insertable = false, updatable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "grade_id", insertable = false, updatable = false)
    private Grade grade;

    public SubmittableTask(String studentId, int taskId) {
        this.studentId = studentId;
        this.taskId = taskId;
    }
}