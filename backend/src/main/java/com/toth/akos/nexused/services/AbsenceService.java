package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AbsenceDTO;
import com.toth.akos.nexused.dtos.requests.AbsenceReqDTO;
import com.toth.akos.nexused.entities.Absence;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.AbsenceMapper;
import com.toth.akos.nexused.mappers.LessonMapper;
import com.toth.akos.nexused.mappers.UserMapper;
import com.toth.akos.nexused.repositories.AbsenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AbsenceService {
    private final AbsenceRepository absenceRepository;
    private final AbsenceMapper mapper;
    private final UserService userService;
    private final UserMapper userMapper;
    private final LessonService lessonService;
    private final LessonMapper lessonMapper;

    public Absence getByAbsenceIdWithUserInfo(int absenceId) {
        Optional<Absence> oAbsence = absenceRepository.findByIdWithUserInfo(absenceId);
        if (oAbsence.isEmpty()) {
            throw new ApplicationException("Absence not found", HttpStatus.NOT_FOUND);
        }
        return oAbsence.get();
    }

    public List<AbsenceDTO> getFirstFiveBySubjectIdAndClassId(int subjectId, int classId) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Absence> absencesPage = absenceRepository.findPagedBySubjectIdAndClassId(subjectId, classId, pageable);
        List<Absence> absences = absencesPage.getContent();
        List<AbsenceDTO> absenceDTOs = new ArrayList<>();
        for (Absence absence : absences) {
            absenceDTOs.add(mapper.toAbsenceDTO(absence));
        }
        return absenceDTOs;
    }

    public List<AbsenceDTO> getAllBySubjectIdAndClassId(int subjectId, int classId) {
        List<Absence> absences = absenceRepository.findAllBySubjectIdAndClassId(subjectId, classId);
        List<AbsenceDTO> absenceDTOs = new ArrayList<>();
        for (Absence absence : absences) {
            absenceDTOs.add(mapper.toAbsenceDTO(absence));
        }
        return absenceDTOs;
    }

    public Integer deleteAbsence(int absenceId) {
        absenceRepository.deleteById(absenceId);
        return absenceId;
    }

    public AbsenceDTO uploadAbsence(AbsenceReqDTO absenceReqDTO) {
        Absence absence = mapper.toAbsence(absenceReqDTO);
        absence.setModificationDate(LocalDateTime.now());
        absence.setUser(userMapper.toUser(userService.getUserById(absenceReqDTO.getStudentId())));
        absence.setLesson(lessonMapper.toLesson(lessonService.getLessonById(absenceReqDTO.getLessonId())));
        Absence savedAbsence = absenceRepository.save(absence);
        return mapper.toAbsenceDTO(savedAbsence);
    }
}
