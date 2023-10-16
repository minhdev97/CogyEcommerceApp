package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.entity.CartLine;
import com.cogy_ecommerce_service.payload.response.CartLineResponseDTO;
import com.cogy_ecommerce_service.payload.response.SuperCartLineResponseDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ConvertCartlineToSuperCartlineResponeDTOImpl {
    public SuperCartLineResponseDTO cartLineToSuperCartlineDTO(CartLine cartLine) {
        return null;
    }

    public void addToList(CartLine cartLine) {
        List<CartLineResponseDTO> cartLineResponseDTOList = new ArrayList<>();

    }
}

