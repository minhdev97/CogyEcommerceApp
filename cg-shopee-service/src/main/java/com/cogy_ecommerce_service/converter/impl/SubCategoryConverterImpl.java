package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.SubCategoryConverter;
import com.cogy_ecommerce_service.entity.SubCategory;
import com.cogy_ecommerce_service.payload.request.SubCategoryRequestDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class SubCategoryConverterImpl implements SubCategoryConverter {

    @Override
    public SubCategoryResponseDTO convertEntityToResponse(SubCategory subCategory) {
        return SubCategoryResponseDTO.builder()
                .id(subCategory.getId().toString())
                .name(subCategory.getName())
                .build();
    }


    @Override
    public SubCategory convertRequestToEntity(SubCategoryRequestDTO requestDTO) {
        return SubCategory.builder()
                .id(requestDTO.getId() == null || requestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(requestDTO.getId()))
                .name(requestDTO.getName())
                .build();
    }


    @Override
    public List<SubCategoryResponseDTO> convertListEntityToListDTO(List<SubCategory> subCategories) {
        return subCategories.stream().map(this::convertEntityToResponse).toList();
    }

    @Override
    public SubCategoryDetailResponseDTO convertEntityToSubCategoryResponse(SubCategory subCategory) {
        return SubCategoryDetailResponseDTO.builder()
                .id(subCategory.getId().toString())
                .name(subCategory.getName())
                .build();
    }


}
