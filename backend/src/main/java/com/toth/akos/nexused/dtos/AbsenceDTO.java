package com.toth.akos.nexused.dtos;

public record AbsenceDTO(
    int id,
    String studentId,
    int lessonId,
    int classId,
    int subjectId,
    String status,
    String modificationDate
){}
