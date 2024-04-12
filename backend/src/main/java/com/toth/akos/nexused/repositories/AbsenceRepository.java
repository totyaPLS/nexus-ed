package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Absence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence, Integer> {
    List<Absence> findAllBySubjectIdAndClassId(int subjectId, int classId);
}
