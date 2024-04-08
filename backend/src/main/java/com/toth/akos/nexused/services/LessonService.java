package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.LessonDTO;
import com.toth.akos.nexused.entities.Lesson;
import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.entities.Subject;
import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.LessonMapper;
import com.toth.akos.nexused.repositories.LessonRepository;
import com.toth.akos.nexused.repositories.StudentRepository;
import com.toth.akos.nexused.repositories.TeachingRepository;
import com.toth.akos.nexused.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final TeachingRepository teachingRepository;
    private final StudentRepository studentRepository;
    private final LessonRepository lessonRepository;
    private final LessonMapper lessonMapper;
    private final AuthService authService;
    private final SubjectService subjectService;

    public List<LessonDTO> listLessons() {
        List<LessonDTO> lessons;
        switch (authService.getPrincipalRole()) {
            case TEACHER -> lessons = listTeacherLessons();
            case STUDENT -> lessons = listStudentLessons();
            case PARENT -> lessons = listParentLessons();
            default -> throw new ApplicationException("No lessons found by this user's role", HttpStatus.NOT_FOUND);
        }
        return lessons;
    }

    private List<LessonDTO> listTeacherLessons() {
        List<Teaching> teachings = teachingRepository.findAllByTeacherId(authService.getPrincipalUid());
        return extractLessonsFromTeachings(teachings);
    }

    private List<LessonDTO> listStudentLessons() {
        Optional<Student> oStudent = studentRepository.findById(authService.getPrincipalUid());
        if (oStudent.isEmpty()) {
            throw new ApplicationException("Student not found", HttpStatus.NOT_FOUND);
        }

        int classId = oStudent.get().getClassId();
        List<Teaching> teachings = teachingRepository.findAllByClassId(classId);
        return extractLessonsFromTeachings(teachings);
    }

    private List<LessonDTO> listParentLessons() {
        List<Student> students = studentRepository.findAllByParentId(authService.getPrincipalUid());
        if (students.isEmpty()) {
            throw new ApplicationException("No students found for this parent", HttpStatus.NOT_FOUND);
        }

        List<LessonDTO> lessonDTOs = new ArrayList<>();
        for (Student student : students) {
            int classId = student.getClassId();
            List<Teaching> teachings = teachingRepository.findAllByClassId(classId);
            lessonDTOs.addAll(extractLessonsFromTeachings(teachings));
        }
        return lessonDTOs;
    }

    private List<LessonDTO> extractLessonsFromTeachings(List<Teaching> teachings) {
        List<LessonDTO> lessonDTOs = new ArrayList<>();
        for (Teaching teaching : teachings) {
            List<Lesson> lessons = lessonRepository.findAllByTeachingId(teaching.getId());
            Subject subject = subjectService.getSubjectById(teaching.getSubjectId());
            for (Lesson lesson : lessons) {
                LessonDTO lessonDTO = lessonMapper.toLessonDTO(lesson);
                lessonDTO.setTitle(subject.getName());
                lessonDTOs.add(lessonDTO);
            }
        }
        return lessonDTOs;
    }
}
