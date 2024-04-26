package com.toth.akos.nexused.dtos.requests;

import com.toth.akos.nexused.enums.TaskType;

import java.time.LocalDateTime;

public record TaskReqDTO(
    int announcementId,
    LocalDateTime deadline,
    TaskType type
){}
