package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SellerRepository extends JpaRepository<Seller, UUID> {
    Seller findByUser(User user);

    Seller findByName(String name);
}
