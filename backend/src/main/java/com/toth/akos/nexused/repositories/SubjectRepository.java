package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    List<Subject> findAllByIdNotIn(List<Integer> ids);
}
