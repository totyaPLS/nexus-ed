package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.SubmittableTaskDTO;
import com.toth.akos.nexused.services.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/submitted-tasks/{taskId}")
    public ResponseEntity<List<SubmittableTaskDTO>> listTasksByTaskId(@PathVariable Integer taskId) {
        return ResponseEntity.ok(taskService.getSubmittableTasksByTaskId(taskId));
    }

    @GetMapping("/submittable-task/{taskId}")
    public ResponseEntity<SubmittableTaskDTO> getSubmittableTask(@PathVariable Integer taskId) {
        return ResponseEntity.ok(taskService.getSubmittableTask(taskId));
    }

    @PostMapping("/submit-task")
    public ResponseEntity<Boolean> submitTask(@Valid @RequestBody SubmittableTaskDTO submittableTaskDTO) {
        return ResponseEntity.ok(taskService.submitTask(submittableTaskDTO));
    }
}
