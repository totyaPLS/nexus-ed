package com.toth.akos.nexused.dtos;

public record TaskDTO(
    int announcementId,
    String deadline,
    String status,
    String type
){}
