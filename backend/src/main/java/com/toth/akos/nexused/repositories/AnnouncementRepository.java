package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AnnouncementRepository extends JpaRepository<Announcement, Integer> {

    @Query("SELECT a " +
            "FROM Announcement a LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE a.subjectId = :subjectId AND a.classId = :classId ORDER BY a.published DESC")
    List<Announcement> findAllBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId
    );

    @Query("SELECT a " +
            "FROM Announcement a " +
            "LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE t.announcementId IS NULL AND a.subjectId = :subjectId AND a.classId = :classId")
    List<Announcement> findAnnouncementsNotInTaskBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId
    );

    @Query("SELECT a " +
            "FROM Announcement a " +
            "LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE t.announcementId IS NOT NULL AND a.subjectId = :subjectId AND a.classId = :classId")
    List<Announcement> findAnnouncementsInTaskBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId
    );

    @Query("SELECT a " +
            "FROM Announcement a " +
            "LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE a.id = :announcementId")
    Optional<Announcement> findAnnouncementById(@Param("announcementId") int announcementId);

    @Query("SELECT a " +
            "FROM Announcement a " +
            "LEFT JOIN Task t ON a.id = t.announcementId " +
            "WHERE t.announcementId IS NOT NULL AND a.teacherId = :teacherId AND a.id = :announcementId")
    Optional<Announcement> findTaskByTeacherIdAndAnnouncementId(String teacherId, Integer announcementId);
}
