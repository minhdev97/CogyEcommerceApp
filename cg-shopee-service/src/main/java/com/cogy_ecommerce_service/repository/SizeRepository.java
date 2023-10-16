package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SizeRepository extends JpaRepository<Size, UUID> {

    List<Size> findByActiveTrue();

}
