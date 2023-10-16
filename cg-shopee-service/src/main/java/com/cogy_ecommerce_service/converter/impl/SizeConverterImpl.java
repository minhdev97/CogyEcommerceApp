package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.SizeConverter;
import com.cogy_ecommerce_service.entity.Size;
import com.cogy_ecommerce_service.payload.request.SizeRequestDTO;
import com.cogy_ecommerce_service.payload.response.SizeResponseDTO;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class SizeConverterImpl implements SizeConverter {

    @Override
    public SizeResponseDTO convertEntityToResponse(Size size) {
        return SizeResponseDTO.builder()
                .id(size.getId().toString())
                .name(size.getName())
                .build();
    }


    @Override
    public Size convertRequestToEntity(SizeRequestDTO requestDTO) {
        return Size.builder()
                .id(requestDTO.getId() == null || requestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(requestDTO.getId()))
                .name(requestDTO.getName())
                .build();
    }


}
