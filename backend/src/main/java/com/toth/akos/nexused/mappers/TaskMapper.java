package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.TaskDTO;
import com.toth.akos.nexused.entities.Task;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    List<TaskDTO> toTaskDTOs(List<Task> tasks);

    TaskDTO toTaskDTO(Task task);
}
