package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.SubmittableTaskDTO;
import com.toth.akos.nexused.entities.SubmittableTask;
import com.toth.akos.nexused.mappers.TaskMapper;
import com.toth.akos.nexused.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper mapper;

    public List<SubmittableTaskDTO> getSubmittableTasksByTaskId(Integer taskId) {
        List<SubmittableTask> tasks = taskRepository.findAllByTaskId(taskId);
        List<SubmittableTaskDTO> taskDTOS = new ArrayList<>();
        for (SubmittableTask task : tasks) {
            taskDTOS.add(mapper.toSubmittableTaskDTO(task));
        }
        return taskDTOS;
    }
}
