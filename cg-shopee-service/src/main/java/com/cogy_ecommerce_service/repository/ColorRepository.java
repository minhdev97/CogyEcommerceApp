package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ColorRepository extends JpaRepository<Color, UUID> {

    List<Color> findByActiveTrue();

    Color findByNameAndActiveTrue(String color);
}
