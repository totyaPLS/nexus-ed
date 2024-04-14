package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {
    List<Announcement> findAllBySubjectIdAndClassId(int subjectId, int classId);

    @Query("SELECT a " +
            "FROM Announcement a LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE t.announcementId IS NULL AND a.subjectId = :subjectId AND a.classId = :classId")
    List<Announcement> findAnnouncementsNotInTaskBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId
    );
}
