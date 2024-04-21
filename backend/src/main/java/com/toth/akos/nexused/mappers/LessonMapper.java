package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.LessonDTO;
import com.toth.akos.nexused.entities.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LessonMapper {
    Lesson lessonDTOToLesson(LessonDTO lessonDTO);

    LessonDTO toLessonDTO(Lesson lesson);
}
