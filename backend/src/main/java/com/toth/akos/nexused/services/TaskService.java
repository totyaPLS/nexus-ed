package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.GradeDTO;
import com.toth.akos.nexused.dtos.SubmittableTaskDTO;
import com.toth.akos.nexused.dtos.requests.TaskGradeReqDTO;
import com.toth.akos.nexused.entities.Grade;
import com.toth.akos.nexused.entities.SubmittableTask;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.GradeMapper;
import com.toth.akos.nexused.mappers.TaskMapper;
import com.toth.akos.nexused.repositories.SubmittableTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final SubmittableTaskRepository taskRepository;
    private final TaskMapper mapper;
    private final GradeService gradeService;
    private final GradeMapper gradeMapper;

    public List<SubmittableTaskDTO> getSubmittableTasksByTaskId(Integer taskId) {
        List<SubmittableTask> tasks = taskRepository.findAllByTaskId(taskId);
        List<SubmittableTaskDTO> taskDTOS = new ArrayList<>();
        for (SubmittableTask task : tasks) {
            taskDTOS.add(mapper.toSubmittableTaskDTO(task));
        }
        return taskDTOS;
    }

    public SubmittableTaskDTO uploadTaskGrade(TaskGradeReqDTO taskGradeReqDTO) {
        Grade grade = gradeService.uploadGrade(taskGradeReqDTO);
        SubmittableTask submittableTask = getSubmittableTaskById(taskGradeReqDTO.getSubTaskId());
        submittableTask.setGradeId(grade.getId());
        submittableTask.setGraded(taskGradeReqDTO.getCreated());
        taskRepository.save(submittableTask);
        SubmittableTaskDTO submittableTaskDTO = mapper.toSubmittableTaskDTO(submittableTask);
        GradeDTO gradeDTO = gradeMapper.toGradeDTO(grade);
        submittableTaskDTO.setGrade(gradeDTO);
        return submittableTaskDTO;
    }

    private SubmittableTask getSubmittableTaskById(Integer id) {
        Optional<SubmittableTask> oSubmittableTask = taskRepository.findById(id);
        if (oSubmittableTask.isEmpty()) {
            throw new ApplicationException("Submittable task not found", HttpStatus.NOT_FOUND);
        }
        return oSubmittableTask.get();
    }
}
