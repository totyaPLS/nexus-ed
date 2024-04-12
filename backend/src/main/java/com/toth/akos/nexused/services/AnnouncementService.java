package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.entities.Announcement;
import com.toth.akos.nexused.mappers.AnnouncementMapper;
import com.toth.akos.nexused.mappers.TaskMapper;
import com.toth.akos.nexused.repositories.AnnouncementRepository;
import com.toth.akos.nexused.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper mapper;

    public List<AnnouncementDTO> getAllBySubjectIdAndClassId(int subjectId, int classId) {
        List<Announcement> announcements = announcementRepository.findAllBySubjectIdAndClassId(subjectId, classId);
        return mapper.toAnnouncementDTOs(announcements);
    }
}
