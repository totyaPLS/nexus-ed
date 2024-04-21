package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.SubjectDTO;
import com.toth.akos.nexused.entities.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SubjectMapper {
    List<SubjectDTO> toSubjectDTOs(List<Subject> subjects);
}
