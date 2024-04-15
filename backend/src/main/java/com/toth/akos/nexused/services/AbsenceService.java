package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AbsenceDTO;
import com.toth.akos.nexused.entities.Absence;
import com.toth.akos.nexused.mappers.AbsenceMapper;
import com.toth.akos.nexused.repositories.AbsenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AbsenceService {
    private final AbsenceRepository absenceRepository;
    private final AbsenceMapper mapper;

    public List<AbsenceDTO> getAllBySubjectIdAndClassId(int subjectId, int classId) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Absence> absencesPage = absenceRepository.findAllBySubjectIdAndClassId(subjectId, classId, pageable);
        List<Absence> absences = absencesPage.getContent();
        List<AbsenceDTO> absenceDTOs = new ArrayList<>();
        for (Absence absence : absences) {
            absenceDTOs.add(mapper.toAbsenceDTO(absence));
        }
        return absenceDTOs;
    }
}
