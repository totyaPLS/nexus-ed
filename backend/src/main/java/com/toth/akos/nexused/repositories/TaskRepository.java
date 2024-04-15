package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    @Query("SELECT t FROM Task t " +
            "INNER JOIN Announcement a ON t.announcementId = a.id " +
            "WHERE a.subjectId = :subjectId AND a.classId = :classId")
    Page<Task> findTasksBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId,
            Pageable pageable
    );
}
