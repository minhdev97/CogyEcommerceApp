package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.ColorConverter;
import com.cogy_ecommerce_service.entity.Color;
import com.cogy_ecommerce_service.payload.request.ColorRequestDTO;
import com.cogy_ecommerce_service.payload.response.ColorResponseDTO;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ColorConverterImpl implements ColorConverter {

    @Override
    public ColorResponseDTO convertEntityToResponse(Color color) {
        return ColorResponseDTO.builder()
                .id(color.getId().toString())
                .name(color.getName())
                .build();
    }


    @Override
    public Color convertRequestToEntity(ColorRequestDTO requestDTO) {
        return Color.builder()
                .id(requestDTO.getId() == null || requestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(requestDTO.getId()))
                .name(requestDTO.getName())
                .build();
    }


}
