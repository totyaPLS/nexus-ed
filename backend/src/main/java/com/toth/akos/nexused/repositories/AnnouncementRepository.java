package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {
    List<Announcement> findAllBySubjectIdAndClassId(int subjectId, int classId);
}
