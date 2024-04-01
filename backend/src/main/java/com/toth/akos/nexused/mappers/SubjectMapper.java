package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.SubjectDTO;
import com.toth.akos.nexused.entities.Subject;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
    List<SubjectDTO> toSubjectDTOs(List<Subject> subjects);
}
