package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUid(String uid);
    List<User> findByRole(Role role);
    int countByRole(Role role);
    List<User> findAllByRole(Role role);

    @Query("SELECT u FROM User u " +
            "INNER JOIN Student s ON u.uid = s.id " +
            "WHERE s.classId = :classId ORDER BY u.lastName")
    List<User> findAllStudentUserByClassId(Integer classId);
}
