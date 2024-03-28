package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.ClassDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClassMapper {
    List<ClassDTO> toClassDTOs(List<ClassSchool> classSchools);
}
