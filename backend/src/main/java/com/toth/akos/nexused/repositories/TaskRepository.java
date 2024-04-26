package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}
