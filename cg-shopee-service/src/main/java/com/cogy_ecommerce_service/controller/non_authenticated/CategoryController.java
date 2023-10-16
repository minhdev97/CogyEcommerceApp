package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.payload.response.CategoryModifyResponseDTO;
import com.cogy_ecommerce_service.payload.response.CategoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListCategoryResponseDTO;
import com.cogy_ecommerce_service.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;


    @GetMapping
    public ResponseEntity<?> findAllCategories() {
        ListCategoryResponseDTO categories = categoryService.findByActiveTrue();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> findCategoryById(@PathVariable String id) {
        CategoryResponseDTO category = categoryService.findById(id);
        return new ResponseEntity<>(category,HttpStatus.OK);
    }


    @GetMapping("/bo")
    public ResponseEntity<?> findCategoriesWithAllSubcategories() {
        List<CategoryModifyResponseDTO> categories = categoryService.findCategoriesWithAllSubcategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

}
