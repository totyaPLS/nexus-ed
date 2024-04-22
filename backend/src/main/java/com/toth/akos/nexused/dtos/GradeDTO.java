package com.toth.akos.nexused.dtos;

public record GradeDTO(
    Integer id,
    String studentId,
    String teacherId,
    Integer subjectId,
    Integer classId,
    Integer gradeValue,
    Double weight,
    String created
){}
