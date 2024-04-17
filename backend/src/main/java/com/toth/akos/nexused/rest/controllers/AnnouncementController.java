package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AnnouncementController {
    private final AnnouncementService announcementService;

    @GetMapping("/allAnnouncement/{subjectId}/{classId}")
    public ResponseEntity<List<AnnouncementDTO>> allAnnouncement(
            @PathVariable Integer subjectId, @PathVariable Integer classId) {
        return ResponseEntity.ok(announcementService.getAllAnnouncementBySubjectIdAndClassId(subjectId, classId));
    }

    @GetMapping("/announcements/{subjectId}/{classId}")
    public ResponseEntity<List<AnnouncementDTO>> announcements(
            @PathVariable Integer subjectId, @PathVariable Integer classId) {
        return ResponseEntity.ok(announcementService.getAnnouncementsBySubjectIdAndClassId(subjectId, classId));
    }

    @GetMapping("/tasks/{subjectId}/{classId}")
    public ResponseEntity<List<AnnouncementDTO>> taskAnnouncements(
            @PathVariable Integer subjectId, @PathVariable Integer classId) {
        return ResponseEntity.ok(announcementService.getTaskAnnouncementsBySubjectIdAndClassId(subjectId, classId));
    }
}
