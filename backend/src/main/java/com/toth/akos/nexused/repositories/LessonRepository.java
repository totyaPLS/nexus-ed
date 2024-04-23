package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    List<Lesson> findAllByTeachingId(int teachingId);

    @Query("SELECT l FROM Lesson l " +
            "INNER JOIN Teaching t ON l.teachingId = t.id " +
            "WHERE t.subjectId = :subjectId AND t.classId = :classId ORDER BY l.start")
    List<Lesson> findAllBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId
    );
}
