package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.dtos.TaskDTO;
import com.toth.akos.nexused.entities.Announcement;
import com.toth.akos.nexused.entities.Task;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.TaskMapper;
import com.toth.akos.nexused.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper mapper;
    private final AnnouncementService announcementService;

    public List<TaskDTO> getAllBySubjectIdAndClassId(int subjectId, int classId) {
        List<AnnouncementDTO> announcementDTOs = announcementService.getAllBySubjectIdAndClassId(subjectId, classId);
        List<Integer> announcementIds = announcementDTOs.stream().map(AnnouncementDTO::id).collect(Collectors.toList());
        List<Task> tasks = taskRepository.findAllByAnnouncementIdIn(announcementIds);
        return mapper.toTaskDTOs(tasks);
    }

    TaskDTO getTaskById(int id) {
        Optional<Task> task = taskRepository.findById(id);

        if (task.isEmpty()) {
            throw new ApplicationException("No task found by this id: " + id, HttpStatus.NOT_FOUND);
        }
        return mapper.toTaskDTO(task.get());
    }
}
