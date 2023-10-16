package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.payload.response.CartResponseDTO;

public interface CartService {
    CartResponseDTO findById(String id);
}