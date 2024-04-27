package com.toth.akos.nexused.dtos.requests;

import com.toth.akos.nexused.enums.AbsenceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AbsenceReqDTO {
    private int absenceId;
    private String studentId;
    private int lessonId;
    private AbsenceType status;
    private int classId;
    private int subjectId;
}
