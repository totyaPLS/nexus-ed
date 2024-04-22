package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.GradeDataForStudentDTO;
import com.toth.akos.nexused.services.GradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class GradeController {
    private final GradeService gradeService;

    @GetMapping("/classGrades/{subjectId}/{classId}")
    public ResponseEntity<List<GradeDataForStudentDTO>> teacherAbsences(
            @PathVariable Integer subjectId, @PathVariable Integer classId
    ) {
        return ResponseEntity.ok(gradeService.getGradeTable(subjectId, classId));
    }
}
