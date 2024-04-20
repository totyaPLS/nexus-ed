package com.toth.akos.nexused.dtos;

public record GradeDTO(
    Integer id,
    String studentId,
    String teacherId,
    Integer gradeValue,
    Double weight
){}
