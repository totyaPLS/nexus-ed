package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, String> {
}
