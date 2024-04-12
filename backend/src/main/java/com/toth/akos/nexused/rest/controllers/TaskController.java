package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.TaskDTO;
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

    @GetMapping("/teacherTasks/{subjectId}/{classId}")
    public ResponseEntity<List<TaskDTO>> teacherTasks(@PathVariable Integer subjectId, @PathVariable Integer classId) {
        return ResponseEntity.ok(taskService.getAllBySubjectIdAndClassId(subjectId, classId));
    }
}
