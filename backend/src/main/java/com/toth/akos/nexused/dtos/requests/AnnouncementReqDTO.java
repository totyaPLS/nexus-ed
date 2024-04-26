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
public class AnnouncementReqDTO {
    private int id;
    private String teacherId;
    private int subjectId;
    private int classId;
    private String title;
    private String description;
    private LocalDateTime published;
    private TaskReqDTO task;
}
