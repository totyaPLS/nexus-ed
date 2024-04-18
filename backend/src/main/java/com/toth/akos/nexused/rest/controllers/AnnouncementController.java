package com.toth.akos.nexused.rest.controllers;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.dtos.CommentDTO;
import com.toth.akos.nexused.services.AnnouncementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
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

    @PostMapping("/uploadComment")
    public ResponseEntity<AnnouncementDTO> uploadComment(
            @Valid @RequestBody CommentDTO commentDTO) {
        AnnouncementDTO updatedAnnouncementDTO = announcementService.uploadComment(commentDTO);
        return ResponseEntity.created(URI.create("/announcements/" + updatedAnnouncementDTO.getId())).body(updatedAnnouncementDTO);
    }
}
