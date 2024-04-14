package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.TaskDTO;
import com.toth.akos.nexused.entities.Task;
import com.toth.akos.nexused.entities.TaskWithAnnouncement;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.TaskMapper;
import com.toth.akos.nexused.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper mapper;
    private final AnnouncementService announcementService;

    public List<TaskDTO> getAllBySubjectIdAndClassId(int subjectId, int classId) {
        List<TaskWithAnnouncement> taskWithAnnouncements =
                taskRepository.findTasksBySubjectIdAndClassId(subjectId, classId);
        List<TaskDTO> taskDTOs = new ArrayList<>();
        for (TaskWithAnnouncement taskWithAnnouncement : taskWithAnnouncements) {
            taskDTOs.add(mapper.toTaskDTO(taskWithAnnouncement));
        }
        return taskDTOs;
    }

    TaskDTO getTaskById(int id) {
        Optional<Task> task = taskRepository.findById(id);

        if (task.isEmpty()) {
            throw new ApplicationException("No task found by this id: " + id, HttpStatus.NOT_FOUND);
        }
        return mapper.toTaskDTO(task.get());
    }
}
