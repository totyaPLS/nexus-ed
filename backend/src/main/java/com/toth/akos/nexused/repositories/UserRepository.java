package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUid(String uid);
    List<User> findByRole(Role role);
    int countByRole(Role role);
    List<User> findAllByRole(Role role);
    Optional<User> findByPhoneAndAndBirthdate(String phone, LocalDate birthdate);
}
