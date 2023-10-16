package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.CartConverter;
import com.cogy_ecommerce_service.converter.CartLineConverter;
import com.cogy_ecommerce_service.entity.Cart;
import com.cogy_ecommerce_service.entity.CartLine;
import com.cogy_ecommerce_service.payload.response.CartLineResponseDTO;
import com.cogy_ecommerce_service.payload.response.CartResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CartConverterImpl implements CartConverter {

    private final CartLineConverter cartLineConverter;

    @Override
    public CartResponseDTO convertEntityToResponse(Cart cart) {
        return CartResponseDTO.builder()
                .id(cart.getId().toString())
                .cartLines(cartLineConverter.convertListEntityToListDTO(cart.getCartLines().stream().toList()))
                .build();
    }


    @Override
    public Cart convertResponseToEntity(CartResponseDTO cartResponseDTO) {
        Cart cart = new Cart();
        cart.setId(UUID.fromString(cartResponseDTO.getId()));
        cart.setCartLines(convertToCartLines(cartResponseDTO.getCartLines(), cart));
        return cart;
    }


    public Collection<CartLine> convertToCartLines(Collection<CartLineResponseDTO> cartLineResponseDTOs, Cart cart) {
        List<CartLine> cartLines = new ArrayList<>();
        for (CartLineResponseDTO cartLineResponseDTO : cartLineResponseDTOs) {
            CartLine cartLine = new CartLine();
            cartLine.setCart(cart);
            cartLine.setId(UUID.fromString(cartLineResponseDTO.getId()));
            cartLines.add(cartLine);
        }
        return cartLines;
    }


}
