package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Category;
import com.cogy_ecommerce_service.payload.request.CategoryRequestDTO;
import com.cogy_ecommerce_service.payload.response.CategoryDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.CategoryModifyResponseDTO;
import com.cogy_ecommerce_service.payload.response.CategoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListCategoryResponseDTO;

import java.util.Collection;

public interface CategoryConverter {

    Category convertRequestToEntity(CategoryRequestDTO requestDTO);

    CategoryResponseDTO convertEntityToResponse(Category category);

    CategoryModifyResponseDTO convertEntityToModifyResponse(Category category);

    CategoryDetailResponseDTO convertEntityToCategoryDetailResponse(Category category);
    ListCategoryResponseDTO convertListToObjectResponse(Collection<CategoryResponseDTO> categoryResponseDTO);
}
