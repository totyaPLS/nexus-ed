package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.ClassSchool;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<ClassSchool, Integer> {
}
