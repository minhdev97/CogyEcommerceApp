package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Color;
import com.cogy_ecommerce_service.payload.request.ColorRequestDTO;
import com.cogy_ecommerce_service.payload.response.ColorResponseDTO;


public interface ColorConverter {

    ColorResponseDTO convertEntityToResponse(Color color);

    Color convertRequestToEntity(ColorRequestDTO color);

}
