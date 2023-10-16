package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StatusRepository extends JpaRepository<Status, UUID> {
    Status findByNameEqualsIgnoreCase(String name);
}
