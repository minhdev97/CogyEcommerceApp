package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.CategoryConverter;
import com.cogy_ecommerce_service.converter.SubCategoryConverter;
import com.cogy_ecommerce_service.entity.Category;
import com.cogy_ecommerce_service.entity.SubCategory;
import com.cogy_ecommerce_service.payload.request.CategoryRequestDTO;
import com.cogy_ecommerce_service.payload.response.CategoryDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.CategoryModifyResponseDTO;
import com.cogy_ecommerce_service.payload.response.CategoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListCategoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CategoryConverterImpl implements CategoryConverter {

    private final SubCategoryConverter subCategoryConverter;

    @Override
    public Category convertRequestToEntity(CategoryRequestDTO requestDTO) {
        return Category.builder().id(requestDTO.getId() == null || requestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(requestDTO.getId()))
                .name(requestDTO.getName())
                .image(requestDTO.getImage())
                .build();
    }


    @Override
    public CategoryResponseDTO convertEntityToResponse(Category category) {
        return CategoryResponseDTO.builder()
                .id(category.getId().toString())
                .name(category.getName())
                .image(category.getImage())
                .build();
    }

    @Override
    public CategoryModifyResponseDTO convertEntityToModifyResponse(Category category) {
        List<SubCategoryResponseDTO> subCategories = subCategoryConverter.convertListEntityToListDTO(
                (List<SubCategory>) category.getSubCategories()
        );
        return CategoryModifyResponseDTO.builder()
                .id(category.getId().toString())
                .image(category.getImage())
                .name(category.getName())
                .subCategories(subCategories)
                .build();
    }

    @Override
    public CategoryDetailResponseDTO convertEntityToCategoryDetailResponse(Category category) {
        return CategoryDetailResponseDTO.builder()
                .id(category.getId().toString())
                .name(category.getName())
                .build();
    }

    @Override
    public ListCategoryResponseDTO convertListToObjectResponse(Collection<CategoryResponseDTO> categoryResponseDTO) {
        return ListCategoryResponseDTO.builder()
                .categoryList(categoryResponseDTO)
                .build();
    }
}
