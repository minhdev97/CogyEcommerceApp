package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.UserLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserLocationRepository extends JpaRepository<UserLocation, UUID> {
    UserLocation findUserDefaultAddressByUserId(UUID id);
}
