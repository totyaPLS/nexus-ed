package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.DiaryDTO;
import com.toth.akos.nexused.dtos.LessonDTO;
import com.toth.akos.nexused.services.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class LessonController {
    private final LessonService lessonService;

    @GetMapping("/lessons")
    @PreAuthorize("hasAnyAuthority('TEACHER', 'STUDENT', 'PARENT')")
    public ResponseEntity<List<LessonDTO>> getLessons() {
        return ResponseEntity.ok(lessonService.listLessons());
    }

    @GetMapping("/past-lessons/{subjectId}/{classId}")
    @PreAuthorize("hasAuthority('TEACHER')")
    public ResponseEntity<List<LessonDTO>> pastLessons(@PathVariable Integer subjectId, @PathVariable Integer classId) {
        return ResponseEntity.ok(lessonService.listPastLessons(subjectId, classId));
    }

    @GetMapping("/diaries/{subjectId}/{classId}")
    @PreAuthorize("hasAuthority('TEACHER')")
    public ResponseEntity<List<DiaryDTO>> listDiaries(@PathVariable Integer subjectId, @PathVariable Integer classId) {
        return ResponseEntity.ok(lessonService.listDiaries(subjectId, classId));
    }

    @PostMapping("/uploadTopic/{lessonId}")
    @PreAuthorize("hasAuthority('TEACHER')")
    public ResponseEntity<DiaryDTO> uploadTopic(@PathVariable Integer lessonId, @Valid @RequestBody String topic) {
        DiaryDTO diaryDTO = lessonService.uploadTopic(lessonId, topic);
        return ResponseEntity.created(URI.create("/diaries/" + diaryDTO.lessonId())).body(diaryDTO);
    }
}
