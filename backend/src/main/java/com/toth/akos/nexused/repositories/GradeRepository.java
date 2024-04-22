package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Integer> {
    List<Grade> findAllBySubjectIdAndClassId(Integer subjectId, Integer classId);
}
