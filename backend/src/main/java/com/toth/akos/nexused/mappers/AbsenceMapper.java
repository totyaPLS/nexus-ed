package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.AbsenceDTO;
import com.toth.akos.nexused.entities.Absence;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AbsenceMapper {
    List<AbsenceDTO> toAbsenceDTOs(List<Absence> absences);

    @Mapping(target = "firstName", source = "absence.user.firstName")
    @Mapping(target = "lastName", source = "absence.user.lastName")
    @Mapping(target = "absenceDate", source = "absence.lesson.start")
    AbsenceDTO toAbsenceDTO(Absence absence);
}
