package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.entities.Announcement;
import com.toth.akos.nexused.mappers.AnnouncementMapper;
import com.toth.akos.nexused.mappers.TaskMapper;
import com.toth.akos.nexused.repositories.AnnouncementRepository;
import com.toth.akos.nexused.repositories.TaskRepository;
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

    public List<AnnouncementDTO> getAllBySubjectIdAndClassId(int subjectId, int classId) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Announcement> announcementsPage =
                announcementRepository.findAnnouncementsNotInTaskBySubjectIdAndClassId(subjectId, classId, pageable);
        List<Announcement> announcements = announcementsPage.getContent();
        return mapper.toAnnouncementDTOs(announcements);
    }
}
