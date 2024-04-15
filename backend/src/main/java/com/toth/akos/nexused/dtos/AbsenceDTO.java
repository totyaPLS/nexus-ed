package com.toth.akos.nexused.dtos;

public record AbsenceDTO(
    int id,
    String studentId,
    String firstName,
    String lastName,
    int lessonId,
    String absenceDate,
    int classId,
    int subjectId,
    String status,
    String modificationDate
){}
