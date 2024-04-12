package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.AnnouncementDTO;
import com.toth.akos.nexused.entities.Announcement;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnnouncementMapper {
    List<AnnouncementDTO> toAnnouncementDTOs(List<Announcement> announcements);
}
