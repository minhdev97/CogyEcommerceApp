package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.payload.request.BuyerRequestDTO;

public interface BuyerConverter {
    User convertRequestToEntity(BuyerRequestDTO buyer);
}
