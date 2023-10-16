package com.cogy_ecommerce_service.controller.non_authenticated;


import com.cogy_ecommerce_service.payload.response.ProductDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.RelatedProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.SubCategoryResponseDTO;
import com.cogy_ecommerce_service.service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/sub-categories")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    @GetMapping("/categories/{id}/list")
    public ResponseEntity<?> findByCategory(@PathVariable String id) {
        List<SubCategoryResponseDTO> subCategoryResponseDTOList = subCategoryService.findByIdCategory(id);
        return new ResponseEntity<>(subCategoryResponseDTOList, HttpStatus.OK);
    }

    @GetMapping("/categories/{name}")
    public ResponseEntity<?> findBySubCategoriesName(@PathVariable String name) {
        List<SubCategoryResponseDTO> subCategoryDTOList = subCategoryService.findBySubCategoriesName(name);
        return new ResponseEntity<>(subCategoryDTOList, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<?> findRandomSubCategories() {
        List<SubCategoryResponseDTO> subCategoryDTOList = subCategoryService.findRandomSubCategories();
        return new ResponseEntity<>(subCategoryDTOList,HttpStatus.OK);
    }
}
