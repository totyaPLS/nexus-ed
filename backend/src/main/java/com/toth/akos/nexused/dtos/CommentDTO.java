package com.toth.akos.nexused.dtos;

public record CommentDTO(
    int id,
    String personId,
    int announcementId,
    String text,
    String published
){}
