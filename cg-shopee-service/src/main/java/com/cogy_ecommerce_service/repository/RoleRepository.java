package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {

    Role findByName(String name);

}
