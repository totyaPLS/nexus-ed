package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.AbsenceDTO;
import com.toth.akos.nexused.entities.Absence;
import com.toth.akos.nexused.mappers.AbsenceMapper;
import com.toth.akos.nexused.repositories.AbsenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AbsenceService {
    private final AbsenceRepository absenceRepository;
    private final AbsenceMapper mapper;

    public List<AbsenceDTO> getAllBySubjectIdAndClassId(int subjectId, int classId) {
        List<Absence> absences = absenceRepository.findAllBySubjectIdAndClassId(subjectId, classId);
        return mapper.toAbsenceDTOs(absences);
    }
}
