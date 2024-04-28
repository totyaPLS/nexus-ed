package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AbsenceDTO;
import com.toth.akos.nexused.dtos.requests.AbsenceReqDTO;
import com.toth.akos.nexused.entities.Absence;
import com.toth.akos.nexused.entities.Student;
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
    private final AuthService authService;
    private final StudentService studentService;

    public Absence getByAbsenceIdWithUserInfo(int absenceId) {
        Optional<Absence> oAbsence = absenceRepository.findByIdWithUserInfo(absenceId);
        if (oAbsence.isEmpty()) {
            throw new ApplicationException("Absence not found", HttpStatus.NOT_FOUND);
        }
        return oAbsence.get();
    }

    public List<AbsenceDTO> getFirstFiveBySubjectIdAndClassId(int subjectId, int classId) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Absence> absencesPage;

        switch (authService.getPrincipalRole()) {
            case TEACHER -> absencesPage = absenceRepository.findPagedBySubjectIdAndClassId(subjectId, classId, pageable);
            case STUDENT -> absencesPage = absenceRepository.findPagedByStudentIdSubjectIdAndClassId(
                    authService.getPrincipalUid(), subjectId, classId, pageable
            );
            case PARENT -> absencesPage = getFirstFiveForParent(subjectId, classId, pageable);
            default -> throw new ApplicationException("No absences found by this user's role", HttpStatus.NOT_FOUND);
        }

        List<Absence> absences = absencesPage.getContent();
        List<AbsenceDTO> absenceDTOs = new ArrayList<>();
        for (Absence absence : absences) {
            absenceDTOs.add(mapper.toAbsenceDTO(absence));
        }
        return absenceDTOs;
    }

    public List<AbsenceDTO> getAllBySubjectIdAndClassId(int subjectId, int classId) {
        List<Absence> absences;

        switch (authService.getPrincipalRole()) {
            case TEACHER -> absences = absenceRepository.findAllBySubjectIdAndClassId(subjectId, classId);
            case STUDENT -> absences = absenceRepository.findAllByStudentIdAndSubjectIdAndClassId(
                    authService.getPrincipalUid(), subjectId, classId
            );
            case PARENT -> absences = getAllForParent(subjectId, classId);
            default -> throw new ApplicationException("No absences found by this user's role", HttpStatus.NOT_FOUND);
        }

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

    private Page<Absence> getFirstFiveForParent(int subjectId, int classId, Pageable pageable) {
        List<Student> students = studentService.getAllByPrincipalParentId();
        if (students.isEmpty()) {
            throw new ApplicationException("No students found for this parent", HttpStatus.NOT_FOUND);
        }

        Pageable updatedPageable = pageable;
        Page<Absence> absencePage = null;
        for (Student student : students) {
            absencePage = absenceRepository.findPagedByStudentIdSubjectIdAndClassId(
                    student.getId(), subjectId, classId, updatedPageable
            );
            if (absencePage.getSize() == updatedPageable.getPageSize()) {
                break;
            }
            updatedPageable = PageRequest.of(0, 5 - absencePage.getSize());
        }

        return absencePage;
    }

    private List<Absence> getAllForParent(int subjectId, int classId) {
        List<Student> students = studentService.getAllByPrincipalParentId();
        if (students.isEmpty()) {
            throw new ApplicationException("No students found for this parent", HttpStatus.NOT_FOUND);
        }

        List<Absence> absences = new ArrayList<>();
        for (Student student : students) {
            absences.addAll(absenceRepository.findAllByStudentIdAndSubjectIdAndClassId(student.getId(), subjectId, classId));
        }
        return absences;
    }

}
