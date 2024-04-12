package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.AbsenceDTO;
import com.toth.akos.nexused.services.AbsenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AbsenceController {
    private final AbsenceService absenceService;

    @GetMapping("/teacherAbsences/{subjectId}/{classId}")
    public ResponseEntity<List<AbsenceDTO>> teacherAbsences(@PathVariable Integer subjectId, @PathVariable Integer classId) {
        return ResponseEntity.ok(absenceService.getAllBySubjectIdAndClassId(subjectId, classId));
    }
}
