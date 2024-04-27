package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.GradeDTO;
import com.toth.akos.nexused.dtos.requests.TaskGradeReqDTO;
import com.toth.akos.nexused.entities.Grade;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GradeMapper {
    List<GradeDTO> toGradeDTOs(List<Grade> grades);

    @Mapping(target = "gradeValue", source = "grade")
    Grade toGrade(TaskGradeReqDTO taskGradeReqDTO);

    GradeDTO toGradeDTO(Grade grade);
}
