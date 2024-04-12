package com.toth.akos.nexused.dtos;

public record AnnouncementDTO(
    int id,
    String teacherId,
    int subjectId,
    int classId,
    String title,
    String description,
    String published
){}
