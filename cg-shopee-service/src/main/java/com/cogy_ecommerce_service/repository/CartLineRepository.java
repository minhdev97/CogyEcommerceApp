package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Cart;
import com.cogy_ecommerce_service.entity.CartLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CartLineRepository extends JpaRepository<CartLine, UUID> {
}
