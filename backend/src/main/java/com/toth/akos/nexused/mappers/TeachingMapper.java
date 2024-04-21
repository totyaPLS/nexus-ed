package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.TeacherDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TeachingMapper {
    List<TeacherDTO> toTeachingDTOs(List<ClassSchool> classSchools);
}
