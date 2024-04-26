package com.toth.akos.nexused.dtos;

import com.toth.akos.nexused.enums.TaskType;

public record TaskDTO(
    int announcementId,
    String deadline,
    TaskType type
){}
