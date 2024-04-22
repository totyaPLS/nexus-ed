package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.ClassSchool;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassRepository extends JpaRepository<ClassSchool, Integer> {
    List<ClassSchool> findAllByClassLevelIn(List<Integer> classLevels);

    List<ClassSchool> findAllByClassLevel(Integer classLevel);

    Optional<ClassSchool> findByClassLevelAndLetter(Integer classLevel, Character letter);
}
