package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.TeacherDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TeachingMapper {
    List<TeacherDTO> toTeachingDTOs(List<ClassSchool> classSchools);
}
