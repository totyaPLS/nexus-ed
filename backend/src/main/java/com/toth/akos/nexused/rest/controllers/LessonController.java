package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.LessonDTO;
import com.toth.akos.nexused.services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class LessonController {
    private final LessonService lessonService;

    @GetMapping("/lessons")
    public ResponseEntity<List<LessonDTO>> getLessons() {
        return ResponseEntity.ok(lessonService.listLessons());
    }
}
