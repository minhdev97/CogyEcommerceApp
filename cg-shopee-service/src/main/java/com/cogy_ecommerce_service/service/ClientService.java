package com.cogy_ecommerce_service.service;
import com.cogy_ecommerce_service.payload.response.CartResponseDTO;

public interface ClientService {
    Boolean create(CartResponseDTO cartResponseDTO);
}
