package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.dtos.CommentDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.dtos.requests.AnnouncementReqDTO;
import com.toth.akos.nexused.entities.Announcement;
import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.entities.SubmittableTask;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.AnnouncementMapper;
import com.toth.akos.nexused.repositories.AnnouncementRepository;
import com.toth.akos.nexused.repositories.SubmittableTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final SubmittableTaskRepository submittableTaskRepository;
    private final AnnouncementMapper mapper;
    private final CommentService commentService;
    private final AuthService authService;
    private final UserService userService;
    private final StudentService studentService;

    public List<AnnouncementDTO> getAllAnnouncementBySubjectIdAndClassId(int subjectId, int classId) {
        List<Announcement> announcements =
                announcementRepository.findAllBySubjectIdAndClassId(subjectId, classId);
        return mapper.toAnnouncementDTOs(announcements);
    }

    public List<AnnouncementDTO> getAnnouncementsBySubjectIdAndClassId(int subjectId, int classId) {
        List<Announcement> announcements =
                announcementRepository.findAnnouncementsNotInTaskBySubjectIdAndClassId(subjectId, classId);
        return getAnnouncementDTOsWithComments(announcements);
    }

    public List<AnnouncementDTO> getTaskAnnouncementsBySubjectIdAndClassId(int subjectId, int classId) {
        List<Announcement> announcements =
                announcementRepository.findAnnouncementsInTaskBySubjectIdAndClassId(subjectId, classId);
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
        Announcement announcement = getAnnouncementById(commentDTO.getAnnouncementId());
        AnnouncementDTO announcementDTO = mapper.toAnnouncementDTO(announcement);
        List<CommentDTO> commentDTOs = commentService.getCommentsByAnnouncementId(announcementDTO.getId());
        announcementDTO.setComments(commentDTOs);
        return announcementDTO;
    }

    public Boolean isAllowedForAnnouncement(int announcementId) {
        Optional<Announcement> foundTask = announcementRepository.findTaskByTeacherIdAndAnnouncementId(
                authService.getPrincipalUid(),
                announcementId
        );
        return foundTask.isPresent();
    }

    public AnnouncementDTO uploadAnnouncement(AnnouncementReqDTO announcementReqDTO) {
        UserDTO teacher = userService.getUserById(authService.getPrincipalUid());
        String teacherId = teacher.getUid();
        announcementReqDTO.setTeacherId(teacherId);
        LocalDateTime currentDateTime = LocalDateTime.now();
        announcementReqDTO.setPublished(currentDateTime);
        Announcement announcement = mapper.toAnnouncement(announcementReqDTO);
        if (announcement.getTask() != null) {
            announcement.getTask().setAnnouncement(announcement);
        }
        Announcement saved = announcementRepository.save(announcement);
        if (announcement.getTask() != null) {
            List<String> studentUIDs = studentService.getAllByClassId(announcementReqDTO.getClassId()).stream().map(Student::getId).toList();
            List<SubmittableTask> submittableTasks = new ArrayList<>();
            for (String studentUid : studentUIDs) {
                submittableTasks.add(new SubmittableTask(studentUid, saved.getId()));
            }
            submittableTaskRepository.saveAll(submittableTasks);
        }

        AnnouncementDTO announcementDTO = mapper.toAnnouncementDTO(saved);
        List<CommentDTO> commentDTOs = commentService.getCommentsByAnnouncementId(announcementDTO.getId());
        announcementDTO.setComments(commentDTOs);
        return announcementDTO;
    }

    private Announcement getAnnouncementById(int id) {
        Optional<Announcement> oAnnouncement = announcementRepository.findAnnouncementById(id);
        if (oAnnouncement.isEmpty()) {
            throw new ApplicationException("Announcement not found", HttpStatus.NOT_FOUND);
        }
        return oAnnouncement.get();
    }


    public Integer deleteAnnouncement(Integer id) {
        announcementRepository.deleteById(id);
        return id;
    }
}
