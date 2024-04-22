package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    List<Subject> findAllByIdNotIn(List<Integer> ids);

    List<Subject> findAllByClassDifficulty(Integer classDifficulty);

    Optional<Subject> findByNameAndClassDifficulty(String name, Integer classDifficulty);
}
