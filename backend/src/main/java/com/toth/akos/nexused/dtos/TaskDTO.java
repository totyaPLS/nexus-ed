package com.toth.akos.nexused.dtos;

public record TaskDTO(
    int announcementId,
    String title,
    String deadline,
    String type
){}
