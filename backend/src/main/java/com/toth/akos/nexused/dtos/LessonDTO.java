package com.toth.akos.nexused.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LessonDTO {
    private int id;
    private int teachingId;
    private String topic;
    private String title;
    private int subjectId;
    private String classroom;
    private String start;
    private String end;
    private String backgroundColor;
    private String borderColor;
    private String textColor;
}
