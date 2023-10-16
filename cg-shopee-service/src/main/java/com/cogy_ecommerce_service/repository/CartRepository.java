package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Cart;
import com.cogy_ecommerce_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, UUID> {
    Cart findByUser(User user);
}
