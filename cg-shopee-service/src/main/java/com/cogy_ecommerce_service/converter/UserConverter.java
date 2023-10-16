package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.payload.response.BuyerSimpleResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProfileResponseDTO;

public interface UserConverter {
    BuyerSimpleResponseDTO convertEntityToBuyerSimpleResponse(User user);

    ProfileResponseDTO convertEntityToProfileResponse(User userObj);
}
