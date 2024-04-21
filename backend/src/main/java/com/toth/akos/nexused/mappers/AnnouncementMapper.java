package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.entities.Announcement;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnnouncementMapper {
    List<AnnouncementDTO> toAnnouncementDTOs(List<Announcement> announcements);

    AnnouncementDTO toAnnouncementDTO(Announcement announcement);
}
