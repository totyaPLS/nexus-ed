package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    List<Lesson> findAllByTeachingId(int teachingId);
}
