package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.LessonDTO;
import com.toth.akos.nexused.entities.Lesson;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    Lesson lessonDTOToLesson(LessonDTO lessonDTO);

    LessonDTO toLessonDTO(Lesson lesson);
}
