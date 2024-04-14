package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Task;
import com.toth.akos.nexused.entities.TaskWithAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findAllByAnnouncementIdIn(List<Integer> ids);

    @Query("SELECT t FROM TaskWithAnnouncement t " +
            "INNER JOIN Announcement a ON t.announcementId = a.id " +
            "WHERE a.subjectId = :subjectId AND a.classId = :classId")
    List<TaskWithAnnouncement> findTasksBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId
    );
}
