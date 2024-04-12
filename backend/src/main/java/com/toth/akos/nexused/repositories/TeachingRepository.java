package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Teaching;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeachingRepository extends JpaRepository<Teaching, Integer> {
    List<Teaching> findAllByClassId(Integer classId);

    List<Teaching> findAllByTeacherId(String teacherId);

    List<Teaching> findAllByClassIdIn(List<Integer> classIds);
}
