package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.CartLine;
import com.cogy_ecommerce_service.payload.request.AddToCartRequestDTO;
import com.cogy_ecommerce_service.payload.request.CartLineRequestDTO;
import com.cogy_ecommerce_service.payload.response.CartLineResponseDTO;

import java.util.List;

public interface CartLineConverter {

    CartLineResponseDTO convertCartLineEntityToResponse(CartLine cartLine);

    CartLine convertAddToCartRequestToEntity(AddToCartRequestDTO addToCartRequestDTO);

    List<CartLineResponseDTO> convertListEntityToListDTO(List<CartLine> cartLineList);

    CartLine convertResponseToCartLineEntity(CartLineResponseDTO cartLineResponseDTO);
}
