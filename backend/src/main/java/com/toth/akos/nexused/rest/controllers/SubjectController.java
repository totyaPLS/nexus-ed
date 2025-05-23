package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.SubjectDTO;
import com.toth.akos.nexused.dtos.SubjectMenuItemDTO;
import com.toth.akos.nexused.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class SubjectController {
    private final SubjectService subjectService;

    @GetMapping("/availableSubjects")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<SubjectDTO>> availableSubjects() {
        return ResponseEntity.ok(subjectService.listAvailableSubjects());
    }

    @GetMapping("/subjects")
    @PreAuthorize("hasAnyAuthority('TEACHER', 'STUDENT', 'PARENT')")
    public ResponseEntity<List<SubjectMenuItemDTO>> getSubjects() {
        return ResponseEntity.ok(subjectService.listSubjects());
    }
}
