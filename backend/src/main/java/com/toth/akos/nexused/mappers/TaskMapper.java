package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.TaskDTO;
import com.toth.akos.nexused.entities.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(target = "title", source = "task.announcement.title")
    TaskDTO toTaskDTO(Task task);
}
