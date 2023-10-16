package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface VariantRepository extends JpaRepository<Variant, UUID> {
}
