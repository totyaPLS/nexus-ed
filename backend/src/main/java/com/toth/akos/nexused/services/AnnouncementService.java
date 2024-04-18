package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.dtos.CommentDTO;
import com.toth.akos.nexused.entities.Announcement;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.AnnouncementMapper;
import com.toth.akos.nexused.repositories.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        return getAnnouncementDTOsWithComments(announcements);
    }

    public List<AnnouncementDTO> getTaskAnnouncementsBySubjectIdAndClassId(int subjectId, int classId) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Announcement> announcementsPage =
                announcementRepository.findAnnouncementsInTaskBySubjectIdAndClassId(subjectId, classId, pageable);
        List<Announcement> announcements = announcementsPage.getContent();
        return getAnnouncementDTOsWithComments(announcements);
    }

    private List<AnnouncementDTO> getAnnouncementDTOsWithComments(List<Announcement> announcements) {
        List<AnnouncementDTO> announcementDTOs = mapper.toAnnouncementDTOs(announcements);
        for (AnnouncementDTO announcementDTO : announcementDTOs) {
            List<CommentDTO> commentDTOs = commentService.getCommentsByAnnouncementId(announcementDTO.getId());
            announcementDTO.setComments(commentDTOs);
        }
        return announcementDTOs;
    }

    public AnnouncementDTO uploadComment(CommentDTO commentDTO) {
        commentService.addComment(commentDTO);
        Optional<Announcement> oAnnouncement = announcementRepository.findAnnouncementById(commentDTO.getAnnouncementId());
        if (oAnnouncement.isEmpty()) {
            throw new ApplicationException("Announcement not found", HttpStatus.NOT_FOUND);
        }

        Announcement announcement = oAnnouncement.get();
        AnnouncementDTO announcementDTO = mapper.toAnnouncementDTO(announcement);
        List<CommentDTO> commentDTOs = commentService.getCommentsByAnnouncementId(announcementDTO.getId());
        announcementDTO.setComments(commentDTOs);
        return announcementDTO;
    }
}
