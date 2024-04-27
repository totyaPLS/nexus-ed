package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.AbsenceDTO;
import com.toth.akos.nexused.dtos.requests.AbsenceReqDTO;
import com.toth.akos.nexused.entities.Absence;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AbsenceMapper {
    List<AbsenceDTO> toAbsenceDTOs(List<Absence> absences);

    @Mapping(target = "firstName", source = "absence.user.firstName")
    @Mapping(target = "lastName", source = "absence.user.lastName")
    @Mapping(target = "absenceDate", source = "absence.lesson.start")
    @Mapping(target = "studentId", source = "absence.user.uid")
    @Mapping(target = "lessonId", source = "absence.lesson.id")
    AbsenceDTO toAbsenceDTO(Absence absence);

    @Mapping(target = "user.uid", source = "absenceReqDTO.studentId")
    @Mapping(target = "lesson.id", source = "absenceReqDTO.lessonId")
    Absence toAbsence(AbsenceReqDTO absenceReqDTO);
}
