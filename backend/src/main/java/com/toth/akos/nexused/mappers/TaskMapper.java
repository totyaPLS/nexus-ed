package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.SubmittableTaskDTO;
import com.toth.akos.nexused.entities.SubmittableTask;
import com.toth.akos.nexused.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TaskMapper {
    @Mapping(target = "studentName", expression = "java(concatenateFullName(submittableTask.getUser()))")
    SubmittableTaskDTO toSubmittableTaskDTO(SubmittableTask submittableTask);

    default String concatenateFullName(User user) {
        return user.getLastName() + " " + user.getFirstName();
    }

}
