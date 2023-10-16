package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.payload.response.CategoryModifyResponseDTO;
import com.cogy_ecommerce_service.payload.response.CategoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListCategoryResponseDTO;

import java.util.List;

public interface CategoryService {

    CategoryResponseDTO findById(String id);

    List<CategoryModifyResponseDTO> findCategoriesWithAllSubcategories();
    ListCategoryResponseDTO findByActiveTrue();
}
