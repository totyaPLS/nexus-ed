package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.TeacherDTO;
import com.toth.akos.nexused.dtos.TeachingDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import com.toth.akos.nexused.entities.Teaching;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TeachingMapper {
    List<TeacherDTO> toTeachingDTOs(List<ClassSchool> classSchools);

    TeachingDTO toTeachingDTO(Teaching teaching);
}
