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
public class AnnouncementDTO {
    private int id;
    private String teacherId;
    private int subjectId;
    private int classId;
    private String title;
    private String description;
    private String published;
    private TaskDTO task;
    private List<CommentDTO> comments;
}
