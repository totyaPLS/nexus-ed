package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.ClassDTO;
import com.toth.akos.nexused.dtos.SubjectDTO;
import com.toth.akos.nexused.dtos.SubjectMenuItemDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import com.toth.akos.nexused.entities.Student;
import com.toth.akos.nexused.entities.Subject;
import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.ClassMapper;
import com.toth.akos.nexused.mappers.SubjectMapper;
import com.toth.akos.nexused.repositories.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final TeachingService teachingService;
    private final StudentService studentService;
    private final ClassService classService;
    private final SubjectMapper subjectMapper;
    private final ClassMapper classMapper;
    private final AuthService authService;

    public List<SubjectDTO> listAvailableSubjects() {
        List<Teaching> teachings = teachingService.getAll();
        List<Integer> subjectIds = teachings.stream()
                .map(Teaching::getSubjectId)
                .collect(Collectors.toList());

        List<Subject> subjects = subjectIds.isEmpty() ?
                subjectRepository.findAll() :
                subjectRepository.findAllByIdNotIn(subjectIds);

        return subjectMapper.toSubjectDTOs(subjects);
    }

    public Subject getSubjectById(int subjectId) {
        Optional<Subject> oSubject = subjectRepository.findById(subjectId);
        if (oSubject.isEmpty()) {
            throw new ApplicationException("Subject not found", HttpStatus.NOT_FOUND);
        }
        return oSubject.get();
    }

    public List<SubjectMenuItemDTO> listSubjects() {
        List<SubjectMenuItemDTO> subjectDTOs;
        switch (authService.getPrincipalRole()) {
            case TEACHER -> subjectDTOs = listTeacherSubjectsMenus();
            case STUDENT -> subjectDTOs = listStudentSubjectsMenus();
            case PARENT -> subjectDTOs = listParentSubjectsMenus();
            default -> throw new ApplicationException("No subjects found by this user's role", HttpStatus.NOT_FOUND);
        }
        return subjectDTOs;
    }

    private List<SubjectMenuItemDTO> listTeacherSubjectsMenus() {
        List<Teaching> teachings = teachingService.getAllByTeacherId();
        return createSubjectMenuFromTeachings(teachings);
    }

    private List<SubjectMenuItemDTO> listStudentSubjectsMenus() {
        int studentClassId = this.studentService.getLoggedInStudent().getClassId();
        List<Teaching> teachings = teachingService.getAllByClassId(studentClassId);
        return createSubjectMenuFromTeachings(teachings);
    }

    private List<SubjectMenuItemDTO> listParentSubjectsMenus() {
        List<Student> students = studentService.getAllByPrincipalParentId();
        List<Integer> classIds = students.stream().map(Student::getClassId).collect(Collectors.toList());
        List<Teaching> teachings = teachingService.getAllByClassIds(classIds);
        return createSubjectMenuFromTeachings(teachings);
    }

    private List<SubjectDTO> extractSubjectsFromTeachings(List<Teaching> teachings) {
        Set<Integer> subjectIds = teachings.stream().map(Teaching::getSubjectId).collect(Collectors.toSet());
        List<Subject> subjects = subjectRepository.findAllById(subjectIds);
        return subjectMapper.toSubjectDTOs(subjects);
    }

    private List<ClassDTO> extractClassesFromTeachings(List<Teaching> teachings) {
        Set<Integer> classIds = teachings.stream().map(Teaching::getClassId).collect(Collectors.toSet());
        List<ClassSchool> classes = classService.getAllByIds(classIds);
        return classMapper.toClassDTOs(classes);
    }

    private List<SubjectMenuItemDTO> createSubjectMenuFromTeachings(List<Teaching> teachings) {
        Map<Integer, List<ClassDTO>> subjectMenus = new HashMap<>();

        // Populating subjectMenus map
        List<ClassDTO> classes = extractClassesFromTeachings(teachings);
        for (Teaching teaching : teachings) {
            int subjectId = teaching.getSubjectId();
            int classId = teaching.getClassId();
            if (!subjectMenus.containsKey(subjectId)) {
                subjectMenus.put(subjectId, new ArrayList<>());
            }
            for (ClassDTO aClass : classes) {
                if (aClass.id() == classId) {
                    subjectMenus.get(subjectId).add(aClass);
                    break;
                }
            }
        }

        // Creating SubjectClassesTree objects
        List<SubjectDTO> subjects = extractSubjectsFromTeachings(teachings);
        List<SubjectMenuItemDTO> result = new ArrayList<>();
        for (Map.Entry<Integer, List<ClassDTO>> entry : subjectMenus.entrySet()) {
            int subjectId = entry.getKey();
            SubjectDTO subject = null;
            for (SubjectDTO s : subjects) {
                if (s.id() == subjectId) {
                    subject = s;
                    break;
                }
            }
            if (subject != null) {
                result.add(new SubjectMenuItemDTO(subject, entry.getValue().toArray(new ClassDTO[0])));
            }
        }
        return result;
    }

    public Integer getSubjectIdByNameAndDifficulty(String name, Integer difficulty) {
        Optional<Subject> oSubject = subjectRepository.findByNameAndClassDifficulty(name, difficulty);
        if (oSubject.isEmpty()) {
            throw new ApplicationException("subject not found", HttpStatus.NOT_FOUND);
        }

        return subjectMapper.toSubjectDTO(oSubject.get()).id();
    }
}
