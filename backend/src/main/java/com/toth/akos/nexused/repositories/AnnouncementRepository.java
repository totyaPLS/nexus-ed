package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {

    @Query("SELECT a " +
            "FROM Announcement a LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE a.subjectId = :subjectId AND a.classId = :classId")
    Page<Announcement> findAllBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId,
            Pageable pageable
    );

    @Query("SELECT a " +
            "FROM Announcement a " +
            "LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE t.announcementId IS NULL AND a.subjectId = :subjectId AND a.classId = :classId")
    Page<Announcement> findAnnouncementsNotInTaskBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId,
            Pageable pageable
    );

    @Query("SELECT a " +
            "FROM Announcement a " +
            "LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE t.announcementId IS NOT NULL AND a.subjectId = :subjectId AND a.classId = :classId")
    Page<Announcement> findAnnouncementsInTaskBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId,
            Pageable pageable
    );
}
