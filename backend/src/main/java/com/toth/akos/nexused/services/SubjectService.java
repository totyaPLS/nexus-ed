package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.SubjectDTO;
import com.toth.akos.nexused.entities.Subject;
import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.mappers.SubjectMapper;
import com.toth.akos.nexused.repositories.SubjectRepository;
import com.toth.akos.nexused.repositories.TeachingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final TeachingRepository teachingRepository;
    private final SubjectMapper subjectMapper;

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
}
