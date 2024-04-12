package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.AbsenceDTO;
import com.toth.akos.nexused.entities.Absence;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AbsenceMapper {
    List<AbsenceDTO> toAbsenceDTOs(List<Absence> absences);
}
