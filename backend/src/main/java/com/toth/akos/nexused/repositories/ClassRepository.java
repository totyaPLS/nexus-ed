package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.ClassSchool;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<ClassSchool, Integer> {
    List<ClassSchool> findAllByClassLevelIn(List<Integer> classLevels);
}
