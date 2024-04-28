package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.DiaryDTO;
import com.toth.akos.nexused.dtos.LessonDTO;
import com.toth.akos.nexused.entities.Lesson;
import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.entities.Subject;
import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.LessonMapper;
import com.toth.akos.nexused.mappers.TeachingMapper;
import com.toth.akos.nexused.repositories.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final TeachingService teachingService;
    private final StudentService studentService;
    private final AuthService authService;
    private final SubjectService subjectService;
    private final LessonMapper lessonMapper;
    private final TeachingMapper teachingMapper;

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

    public List<LessonDTO> listPastLessons(int subjectId, int classId) {
        List<Lesson> lessons = lessonRepository.findPastLessonsBySubjectIdIdAndClassId(subjectId, classId);
        return lessonMapper.toLessonDTOS(lessons);
    }

    public List<DiaryDTO> listDiaries(int subjectId, int classId) {
        List<Lesson> lessons = lessonRepository.findAllBySubjectIdAndClassId(subjectId, classId);
        List<DiaryDTO> diaryDTOS = new ArrayList<>();
        for (Lesson lesson : lessons) {
            diaryDTOS.add(lessonMapper.toDiaryDTO(lesson));
        }
        return diaryDTOS;
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
        List<Student> students = studentService.getAllByPrincipalParentId();
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
                lessonDTO.setTeaching(teachingMapper.toTeachingDTO(teaching));
                lessonDTOs.add(lessonDTO);
            }
        }
        return lessonDTOs;
    }

    private Lesson findByid(Integer lessonId) {
        Optional<Lesson> oLesson = lessonRepository.findById(lessonId);
        if (oLesson.isEmpty()) {
            throw new ApplicationException("Lesson not found", HttpStatus.NOT_FOUND);
        }
        return oLesson.get();
    }

    public DiaryDTO uploadTopic(Integer lessonId, String topic) {
        Lesson lesson = findByid(lessonId);
        lesson.setTopic(topic);
        lessonRepository.save(lesson);
        return lessonMapper.toDiaryDTO(lesson);
    }

    public LessonDTO getLessonById(int lessonId) {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty()) {
            throw new ApplicationException("Lesson not found", HttpStatus.NOT_FOUND);
        }
        return lessonMapper.toLessonDTO(lesson.get());
    }
}
