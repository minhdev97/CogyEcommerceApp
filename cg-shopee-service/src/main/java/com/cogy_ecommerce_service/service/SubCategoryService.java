package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.entity.SubCategory;
import com.cogy_ecommerce_service.payload.request.SubCategoryRequestDTO;
import com.cogy_ecommerce_service.payload.response.RelatedProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryResponseDTO;

import java.util.List;

public interface SubCategoryService {

    SubCategory findById(String id);

    SubCategoryResponseDTO save(SubCategoryRequestDTO category);

    List<SubCategoryResponseDTO> findByIdCategory(String id);

    List<SubCategoryResponseDTO> findBySubCategoriesName(String name);

    List<SubCategoryResponseDTO> findRandomSubCategories();
}
