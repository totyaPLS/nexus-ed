package com.toth.akos.nexused.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskGradeReqDTO {
    private int id;
    private String studentId;
    private String teacherId;
    private int grade;
    private double weight;
    private int subjectId;
    private int classId;
    private LocalDateTime created;
    private int subTaskId;
}
