package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.configuration.EnvVariable;
import com.cogy_ecommerce_service.converter.CategoryConverter;
import com.cogy_ecommerce_service.payload.response.CategoryModifyResponseDTO;
import com.cogy_ecommerce_service.payload.response.CategoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListCategoryResponseDTO;
import com.cogy_ecommerce_service.repository.CategoryRepository;
import com.cogy_ecommerce_service.service.CategoryService;
import com.cogy_ecommerce_service.utils.GsonUtils;
import com.cogy_ecommerce_service.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final CategoryConverter categoryConverter;

//    private final ValueOperations<String, String> cachedData;
//
//    private final RedisTemplate<String, String> redisTemplate;

    private final GsonUtils<ListCategoryResponseDTO> gsonUtils;

    private final RedisUtils redisUtils;

    private static final String cacheKeyOfCategories = EnvVariable.CACHE_KEY_CATEGORIES;


    @Override
    public ListCategoryResponseDTO findByActiveTrue() {
//        if (Boolean.TRUE.equals(redisTemplate.hasKey(cacheKeyOfCategories))) {
//            String stringOfCachedCategories = cachedData.get(cacheKeyOfCategories);
//            return gsonUtils.parseToObject(stringOfCachedCategories, ListCategoryResponseDTO.class);
//        }
        try {
            if (redisUtils.hasKey(cacheKeyOfCategories)) {
                String stringOfCachedCategories = redisUtils.getCache(cacheKeyOfCategories);
                return gsonUtils.parseToObject(stringOfCachedCategories, ListCategoryResponseDTO.class);
            }
            List<CategoryResponseDTO> categoryResponseDTOS = categoryRepository.findAll().stream().map(categoryConverter::convertEntityToResponse).toList();
            ListCategoryResponseDTO responseDTO = new ListCategoryResponseDTO(categoryResponseDTOS);
            String resultString = gsonUtils.parseToString(responseDTO);
//        cachedData.set(cacheKeyOfCategories, resultString);
            redisUtils.setCache(cacheKeyOfCategories, resultString);
            return responseDTO;
        } catch (Exception e) {
            List<CategoryResponseDTO> categoryResponseDTOS = categoryRepository.findAll().stream().map(categoryConverter::convertEntityToResponse).toList();
            return new ListCategoryResponseDTO(categoryResponseDTOS);
        }
    }


    @Override
    public CategoryResponseDTO findById(String id) {
        return categoryConverter.convertEntityToResponse(categoryRepository.findById(UUID.fromString(id))
                .orElseThrow(IllegalArgumentException::new));
    }


    @Override
    public List<CategoryModifyResponseDTO> findCategoriesWithAllSubcategories() {
        return categoryRepository.findAll().stream().map(categoryConverter::convertEntityToModifyResponse).toList();
    }

}
