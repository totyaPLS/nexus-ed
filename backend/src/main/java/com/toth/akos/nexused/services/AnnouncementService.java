package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.dtos.CommentDTO;
import com.toth.akos.nexused.entities.Announcement;
import com.toth.akos.nexused.mappers.AnnouncementMapper;
import com.toth.akos.nexused.repositories.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper mapper;
    private final CommentService commentService;

    public List<AnnouncementDTO> getAllAnnouncementBySubjectIdAndClassId(int subjectId, int classId) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Announcement> announcementsPage =
                announcementRepository.findAllBySubjectIdAndClassId(subjectId, classId, pageable);
        List<Announcement> announcements = announcementsPage.getContent();
        return mapper.toAnnouncementDTOs(announcements);
    }

    public List<AnnouncementDTO> getAnnouncementsBySubjectIdAndClassId(int subjectId, int classId) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Announcement> announcementsPage =
                announcementRepository.findAnnouncementsNotInTaskBySubjectIdAndClassId(subjectId, classId, pageable);
        List<Announcement> announcements = announcementsPage.getContent();
        return getAnnouncementDTOWithComments(announcements);
    }

    public List<AnnouncementDTO> getTaskAnnouncementsBySubjectIdAndClassId(int subjectId, int classId) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Announcement> announcementsPage =
                announcementRepository.findAnnouncementsInTaskBySubjectIdAndClassId(subjectId, classId, pageable);
        List<Announcement> announcements = announcementsPage.getContent();
        return getAnnouncementDTOWithComments(announcements);
    }

    private List<AnnouncementDTO> getAnnouncementDTOWithComments(List<Announcement> announcements) {
        List<AnnouncementDTO> announcementDTOs = mapper.toAnnouncementDTOs(announcements);
        for (AnnouncementDTO announcementDTO : announcementDTOs) {
            List<CommentDTO> commentDTOs = commentService.getCommentsByAnnouncementId(announcementDTO.getId());
            announcementDTO.setComments(commentDTOs);
        }
        return announcementDTOs;
    }
}
