package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.LessonDTO;
import com.toth.akos.nexused.dtos.SubjectDTO;
import com.toth.akos.nexused.entities.*;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.LessonMapper;
import com.toth.akos.nexused.mappers.SubjectMapper;
import com.toth.akos.nexused.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final TeachingRepository teachingRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final LessonRepository lessonRepository;
    private final SubjectMapper subjectMapper;
    private final LessonMapper lessonMapper;

    public List<SubjectDTO> listAvailableSubjects() {
        List<Teaching> teachings = teachingRepository.findAll();
        List<Integer> subjectIds = teachings.stream()
                .map(Teaching::getSubjectId)
                .collect(Collectors.toList());

        List<Subject> subjects = subjectIds.isEmpty() ?
                subjectRepository.findAll() :
                subjectRepository.findAllByIdNotIn(subjectIds);

        return subjectMapper.toSubjectDTOs(subjects);
    }

    public List<LessonDTO> listLessons() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println();
        List<LessonDTO> lessons = new ArrayList<>();
        // TODO
        /*switch (foundUser.getRole()) {
            case TEACHER -> lessons = listTeacherLessons(foundUser.getUid());
            case STUDENT -> lessons = listStudentLessons(foundUser.getUid());
            case PARENT -> lessons = listParentLessons(foundUser.getUid());
            default -> throw new ApplicationException("No lessons found by this user's role", HttpStatus.NOT_FOUND);
        }*/
        return lessons;
    }

    private List<LessonDTO> listTeacherLessons(String uid) {
        return null;
    }

    private List<LessonDTO> listStudentLessons(String uid) {
        Optional<Student> oStudent = studentRepository.findById(uid);
        if (oStudent.isEmpty()) {
            throw new ApplicationException("Student not found", HttpStatus.NOT_FOUND);
        }

        int classId = oStudent.get().getClassId();
        List<Teaching> teachings = teachingRepository.findAllByClassId(classId);
        List<LessonDTO> lessonDTOs = new ArrayList<>();
        for (Teaching teaching : teachings) {
            List<Lesson> lessons = lessonRepository.findAllByTeachingId(teaching.getId());
            Subject subject = getSubjectById(teaching.getSubjectId());
            for (Lesson lesson : lessons) {
                LessonDTO lessonDTO = lessonMapper.toLessonDTO(lesson);
                lessonDTO.setTitle(subject.getName());
                lessonDTOs.add(lessonDTO);
            }
        }
        return lessonDTOs;
    }

    private List<LessonDTO> listParentLessons(String uid) {
        return null;
    }

    private Subject getSubjectById(int subjectId) {
        Optional<Subject> oSubject = subjectRepository.findById(subjectId);
        if (oSubject.isEmpty()) {
            throw new ApplicationException("Subject not found", HttpStatus.NOT_FOUND);
        }
        return oSubject.get();
    }
}
