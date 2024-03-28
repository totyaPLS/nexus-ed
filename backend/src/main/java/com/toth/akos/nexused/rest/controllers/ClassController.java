package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.ClassDTO;
import com.toth.akos.nexused.services.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ClassController {
    private final ClassService classService;

    @GetMapping("/classes")
    public ResponseEntity<List<ClassDTO>> allClasses() {
        return ResponseEntity.ok(classService.allClasses());
    }
}
