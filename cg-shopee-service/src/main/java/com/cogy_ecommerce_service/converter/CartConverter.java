package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Cart;
import com.cogy_ecommerce_service.payload.request.CartByUsernameRequestDTO;
import com.cogy_ecommerce_service.payload.response.CartResponseDTO;

public interface CartConverter {
    CartResponseDTO convertEntityToResponse (Cart cart);
    Cart convertResponseToEntity (CartResponseDTO cartResponseDTO);
}
