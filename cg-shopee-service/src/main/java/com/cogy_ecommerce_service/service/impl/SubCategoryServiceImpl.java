package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.SubCategoryConverter;
import com.cogy_ecommerce_service.entity.Category;
import com.cogy_ecommerce_service.entity.SubCategory;
import com.cogy_ecommerce_service.payload.request.SubCategoryRequestDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryResponseDTO;
import com.cogy_ecommerce_service.repository.CategoryRepository;
import com.cogy_ecommerce_service.repository.SubCategoryRepository;
import com.cogy_ecommerce_service.service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class SubCategoryServiceImpl implements SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;

    private final CategoryRepository categoryRepository;

    private final SubCategoryConverter subCategoryConverter;



    @Override
    public SubCategoryResponseDTO save(SubCategoryRequestDTO category) {
        return subCategoryConverter.convertEntityToResponse(
                subCategoryRepository.save(
                        subCategoryConverter.convertRequestToEntity(category)
                ));
    }


    @Override
    public List<SubCategoryResponseDTO> findByIdCategory(String id) {
        Optional<Category> optionalCategory = categoryRepository.findById(UUID.fromString(id));
        if (optionalCategory.isEmpty()) throw new IllegalArgumentException();
        Category category = optionalCategory.get();
        List<SubCategory> subCategories = category.getSubCategories()
                .stream().filter(SubCategory::isActive).toList();
        return subCategoryConverter.convertListEntityToListDTO(subCategories);
    }
    @Override
    public List<SubCategoryResponseDTO> findBySubCategoriesName(String name) {
        List<SubCategory> subCategories = subCategoryRepository.findByNameContains(name);
        return subCategoryConverter.convertListEntityToListDTO(subCategories);
    }

    @Override
    public List<SubCategoryResponseDTO> findRandomSubCategories() {
        List<SubCategory> subCategories = subCategoryRepository.findRandomSubcategories();
        return subCategoryConverter.convertListEntityToListDTO(subCategories);
    }


    @Override
    public SubCategory findById(String id) {
        return subCategoryRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new);
    }

}
