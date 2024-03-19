package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUid(String uid);
    Optional<User> findByRole(Role role);
    long countByRole(Role role);
}
