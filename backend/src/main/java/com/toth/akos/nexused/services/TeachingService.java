package com.toth.akos.nexused.services;

import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.repositories.TeachingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
