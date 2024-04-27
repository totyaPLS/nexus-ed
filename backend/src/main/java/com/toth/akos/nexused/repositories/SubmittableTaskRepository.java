package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.SubmittableTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmittableTaskRepository extends JpaRepository<SubmittableTask, Integer> {
    List<SubmittableTask> findAllByTaskId(Integer taskId);

    Optional<SubmittableTask> findByTaskIdAndStudentId(Integer taskId, String studentId);

}
