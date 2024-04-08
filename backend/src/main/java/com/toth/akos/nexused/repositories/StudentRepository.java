package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, String> {
    List<Student> findAllByParentId(String parentId);
}
