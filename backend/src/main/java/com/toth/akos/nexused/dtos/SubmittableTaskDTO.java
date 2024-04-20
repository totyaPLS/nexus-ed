package com.toth.akos.nexused.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubmittableTaskDTO {
    private Integer id;
    private String studentId;
    private String studentName;
    private Integer gradeId;
    private Integer taskId;
    private String graded;
    private String text;
    private String submitted;
    private GradeDTO grade;
}
