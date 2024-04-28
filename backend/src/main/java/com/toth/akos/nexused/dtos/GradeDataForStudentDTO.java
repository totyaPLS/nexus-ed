package com.toth.akos.nexused.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GradeDataForStudentDTO {
    int id;
    String studentId;
    String studentName;
    String teacherId;
    int subjectId;
    int classId;
    List<MonthGradesMap> gradesPerMonth;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MonthGradesMap {
        String date;
        List<GradeDTO> gradeValues;
    }
}
