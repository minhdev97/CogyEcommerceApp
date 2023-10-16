package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Order;
import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByStatusAndSeller(Order.Status status, Seller seller);

    Optional<Order> findByIdAndSeller(UUID id, Seller seller);

    List<Order> findByStatusAndBuyer(Order.Status valueOf, User buyer);
}
