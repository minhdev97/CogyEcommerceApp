package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.SubCategory;
import com.cogy_ecommerce_service.payload.request.SubCategoryRequestDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryResponseDTO;

import java.util.List;

public interface SubCategoryConverter {

    SubCategoryResponseDTO convertEntityToResponse(SubCategory subCategory);

    SubCategory convertRequestToEntity(SubCategoryRequestDTO category);

    List<SubCategoryResponseDTO> convertListEntityToListDTO(List<SubCategory> subCategories);

    SubCategoryDetailResponseDTO convertEntityToSubCategoryResponse(SubCategory subCategory);
}
