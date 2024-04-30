package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.GradeDataForStudentDTO;
import com.toth.akos.nexused.dtos.SubmittableTaskDTO;
import com.toth.akos.nexused.dtos.requests.TaskGradeReqDTO;
import com.toth.akos.nexused.services.GradeService;
import com.toth.akos.nexused.services.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class GradeController {
    private final GradeService gradeService;
    private final TaskService taskService;

    @GetMapping("/classGrades/{subjectId}/{classId}")
    @PreAuthorize("hasAuthority('TEACHER')")
    public ResponseEntity<List<GradeDataForStudentDTO>> teacherAbsences(@PathVariable Integer subjectId,
                                                                        @PathVariable Integer classId) {
        return ResponseEntity.ok(gradeService.getGradeTable(subjectId, classId));
    }

    @PostMapping("/upload-task-grade")
    @PreAuthorize("hasAuthority('TEACHER')")
    public ResponseEntity<SubmittableTaskDTO> uploadTaskGrade(
            @Valid @RequestBody TaskGradeReqDTO taskGradeReqDTO) {
        SubmittableTaskDTO submittableTaskDTO = taskService.uploadTaskGrade(taskGradeReqDTO);
        return ResponseEntity.created(URI.create("/grades/" + submittableTaskDTO.getId())).body(submittableTaskDTO);
    }
}
