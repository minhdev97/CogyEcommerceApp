package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.payload.request.SellerRequestDTO;
import com.cogy_ecommerce_service.payload.request.SimpleSellerRequestDTO;
import com.cogy_ecommerce_service.payload.response.SellerResponseDTO;

public interface SellerConverter {

    SellerResponseDTO convertEntityToResponse(Seller seller);

    Seller convertRequestToEntity(SellerRequestDTO requestDTO);

    Seller convertSimpleRequestToEntity(SimpleSellerRequestDTO requestDTO);
}
