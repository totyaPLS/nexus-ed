package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
