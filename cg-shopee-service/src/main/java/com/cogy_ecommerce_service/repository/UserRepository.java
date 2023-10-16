package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhoneContaining(String data);

    User findByConfirmationCode(String confirmationCode);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findUserByEmail(@Param("email") String email);

    @Query("SELECT u FROM User u where u.email = :email and u.confirmationCode = :confirmationCode")
    User findUserByEmailAndConfirmationCode(@Param("email") String email,@Param("confirmationCode") String confirmationCode);

}
