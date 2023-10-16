package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.SellerConverter;
import com.cogy_ecommerce_service.converter.SellerLocationConverter;
import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.payload.request.SellerRequestDTO;
import com.cogy_ecommerce_service.payload.request.SimpleSellerRequestDTO;
import com.cogy_ecommerce_service.payload.response.SellerResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.UUID;

@Component
@Transactional
@RequiredArgsConstructor
public class SellerConverterImpl implements SellerConverter {

    private final SellerLocationConverter sellerLocationConverter;


    @Override
    public SellerResponseDTO convertEntityToResponse(Seller seller) {
        return SellerResponseDTO
                .builder()
                .id(seller.getId())
                .name(seller.getName())
                .image(seller.getImage())
                .build();
    }

    @Override
    public Seller convertRequestToEntity(SellerRequestDTO requestDTO) {
        return Seller
                .builder()
                .id(requestDTO.getId() == null || requestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(requestDTO.getId()))
                .name(requestDTO.getName())
                .image(requestDTO.getImage())
                .locations(sellerLocationConverter.convertListRequestToListEntity(requestDTO.getLocations()))
                .build();
    }

    @Override
    public Seller convertSimpleRequestToEntity(SimpleSellerRequestDTO requestDTO) {
        return Seller.builder()
                .id(requestDTO.getId() == null ? UUID.randomUUID() : UUID.fromString(requestDTO.getId()))
                .build();
    }

}
