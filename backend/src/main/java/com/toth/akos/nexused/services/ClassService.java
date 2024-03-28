package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.ClassDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import com.toth.akos.nexused.mappers.ClassMapper;
import com.toth.akos.nexused.repositories.ClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService {
    private final ClassRepository classRepository;
    private final ClassMapper classMapper;

    public List<ClassDTO> allClasses() {
        List<ClassSchool> all = classRepository.findAll();
        return classMapper.toClassDTOs(all);
    }
}
