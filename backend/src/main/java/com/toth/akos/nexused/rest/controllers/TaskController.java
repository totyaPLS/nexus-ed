package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.SubmittableTaskDTO;
import com.toth.akos.nexused.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/submitted-tasks/{taskId}")
    public ResponseEntity<List<SubmittableTaskDTO>> listTasksByTaskId(@PathVariable Integer taskId) {
        return ResponseEntity.ok(taskService.getSubmittableTasksByTaskId(taskId));
    }
}
