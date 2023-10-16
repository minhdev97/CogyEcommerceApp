package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.CartConverter;
import com.cogy_ecommerce_service.entity.Cart;
import com.cogy_ecommerce_service.payload.response.CartResponseDTO;
import com.cogy_ecommerce_service.repository.CartRepository;
import com.cogy_ecommerce_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final CartConverter cartConverter;

    @Override
    public CartResponseDTO findById(String id) {
        Cart cart = cartRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new);
        return cartConverter.convertEntityToResponse(cart);
    }

}
