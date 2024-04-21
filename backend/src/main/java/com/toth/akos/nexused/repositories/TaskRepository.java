package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.SubmittableTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<SubmittableTask, Integer> {
    List<SubmittableTask> findAllByTaskId(Integer taskId);

}
