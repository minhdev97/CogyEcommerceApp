package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.CartLineConverter;
import com.cogy_ecommerce_service.converter.SellerLocationConverter;
import com.cogy_ecommerce_service.entity.CartLine;
import com.cogy_ecommerce_service.entity.SellerLocation;
import com.cogy_ecommerce_service.payload.request.AddToCartRequestDTO;
import com.cogy_ecommerce_service.payload.response.CartLineResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CartLineConverterImpl implements CartLineConverter {
    private final SellerLocationConverter sellerLocationConverter;

    @Override
    public CartLineResponseDTO convertCartLineEntityToResponse(CartLine cartLine) {
        return CartLineResponseDTO.builder()
                .id(cartLine.getId().toString())
                .quantity(cartLine.getQuantity())
                .salePrice(cartLine.getVariant().getDiscountPrice() == null ? cartLine.getVariant().getSalePrice() : cartLine.getVariant().getDiscountPrice())
                .image(cartLine.getVariant().getProduct().getImage())
                .productName(cartLine.getVariant().getProduct().getName())
                .shopName(cartLine.getVariant().getProduct().getSeller().getName())
                .sellerID(cartLine.getVariant().getProduct().getSeller().getId().toString())
                .variantID(cartLine.getVariant().getId().toString())
                .size(cartLine.getVariant().getSize().getName())
                .color(cartLine.getVariant().getColor().getName())
                .stock(cartLine.getVariant().getStock())
                .sellerLocation(sellerLocationConverter.convertEntityListToResponse((List<SellerLocation>) cartLine.getVariant().getProduct().getSeller().getLocations()))
                .weight(cartLine.getVariant().getWeight())
                .build();
    }

    @Override
    public CartLine convertAddToCartRequestToEntity(AddToCartRequestDTO addToCartRequestDTO) {
        return CartLine.builder()
                .id(addToCartRequestDTO.getId() == null || addToCartRequestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(addToCartRequestDTO.getId()))
                .quantity(addToCartRequestDTO.getQuantity())
                .build();
    }

    @Override
    public List<CartLineResponseDTO> convertListEntityToListDTO(List<CartLine> cartLineList) {
        return cartLineList.stream().map(this::convertCartLineEntityToResponse).collect(Collectors.toList());
    }

    @Override
    public CartLine convertResponseToCartLineEntity(CartLineResponseDTO cartLineResponseDTO) {
        return CartLine.builder()
                .id(UUID.fromString(cartLineResponseDTO.getId()))
                .quantity(cartLineResponseDTO.getQuantity())
                .build();
    }


}
