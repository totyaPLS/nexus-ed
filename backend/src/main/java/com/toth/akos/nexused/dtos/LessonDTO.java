package com.toth.akos.nexused.dtos;

import java.time.LocalDate;

public record LessonDTO(
        int id,
        int teachingId,
        String topic,
        int sequence,
        LocalDate startTime,
        LocalDate endTime
) {
}
