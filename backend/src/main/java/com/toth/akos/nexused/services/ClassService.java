package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.ClassDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.ClassMapper;
import com.toth.akos.nexused.repositories.ClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassService {
    private final ClassRepository classRepository;
    private final ClassMapper classMapper;

    public List<ClassDTO> allClasses() {
        List<ClassSchool> all = classRepository.findAll();
        return classMapper.toClassDTOs(all);
    }

    public List<ClassDTO> availableClasses(List<Integer> classLevels) {
        List<ClassSchool> all = classRepository.findAllByClassLevelIn(classLevels);
        return classMapper.toClassDTOs(all);
    }

    public List<ClassSchool> getAllByIds(Iterable<Integer> classIds) {
        return classRepository.findAllById(classIds);
    }

    public ClassDTO getClassByLevelAndLetter(Integer level, char letter) {
        Optional<ClassSchool> oClass = classRepository.findByClassLevelAndLetter(level, letter);
        if (oClass.isEmpty()) {
            throw new ApplicationException("Class not found", HttpStatus.NOT_FOUND);
        }

        return classMapper.toClassDTO(oClass.get());
    }
}
