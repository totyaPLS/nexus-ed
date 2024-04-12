package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.LessonDTO;
import com.toth.akos.nexused.entities.Lesson;
import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.entities.Subject;
import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.LessonMapper;
import com.toth.akos.nexused.repositories.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final TeachingService teachingService;
    private final StudentService studentService;
    private final AuthService authService;
    private final SubjectService subjectService;
    private final LessonMapper lessonMapper;

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
        List<Teaching> teachings = teachingService.getAllByTeacherId();
        return extractLessonsFromTeachings(teachings);
    }

    private List<LessonDTO> listStudentLessons() {
        Student student = studentService.getLoggedInStudent();
        int classId = student.getClassId();
        List<Teaching> teachings = teachingService.getAllByClassId(classId);
        return extractLessonsFromTeachings(teachings);
    }

    private List<LessonDTO> listParentLessons() {
        List<Student> students = studentService.getAllByParentId();
        if (students.isEmpty()) {
            throw new ApplicationException("No students found for this parent", HttpStatus.NOT_FOUND);
        }

        List<LessonDTO> lessonDTOs = new ArrayList<>();
        for (Student student : students) {
            int classId = student.getClassId();
            List<Teaching> teachings = teachingService.getAllByClassId(classId);
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
