package com.toth.akos.nexused.services;

import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.repositories.TeachingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeachingService {
    private final TeachingRepository teachingRepository;
    private final AuthService authService;

    public List<Teaching> getAll() {
        return teachingRepository.findAll();
    }

    public List<Teaching> getAllByTeacherId() {
        return teachingRepository.findAllByTeacherId(authService.getPrincipalUid());
    }

    public List<Teaching> getAllByClassId(int classId) {
        return teachingRepository.findAllByClassId(classId);
    }

    public List<Teaching> getAllByClassIds(List<Integer> classIds) {
        return teachingRepository.findAllByClassIdIn(classIds);
    }

    public String getTeacherIdBySubjectAndClass(Integer subjectId, Integer classId) {
        Optional<Teaching> oTeaching = teachingRepository.findBySubjectIdAndClassId(subjectId, classId);
        if (oTeaching.isEmpty()) {
            throw new ApplicationException("no teaching found", HttpStatus.NOT_FOUND);
        }

        return oTeaching.get().getTeacherId();
    }
}
