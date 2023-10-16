package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.payload.request.SellerRequestDTO;
import com.cogy_ecommerce_service.payload.response.BooleanResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListSellerLocationResponseDTO;
import com.cogy_ecommerce_service.payload.response.SellerResponseDTO;

public interface SellerService {
    Seller findById(String sellerId);

    SellerResponseDTO create(String userId, SellerRequestDTO requestDTO);

    BooleanResponseDTO isExistName(String name);

    ListSellerLocationResponseDTO findLocationsBySellerId(String id);

    Seller findByName(String shopName);

    Seller getCurrentSeller();
}
