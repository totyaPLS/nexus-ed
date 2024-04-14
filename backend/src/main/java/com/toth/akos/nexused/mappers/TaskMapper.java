package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.TaskDTO;
import com.toth.akos.nexused.entities.Task;
import com.toth.akos.nexused.entities.TaskWithAnnouncement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(target = "title", source = "taskWithAnnouncement.announcement.title")
    TaskDTO toTaskDTO(TaskWithAnnouncement taskWithAnnouncement);

    TaskDTO toTaskDTO(Task task);
}
