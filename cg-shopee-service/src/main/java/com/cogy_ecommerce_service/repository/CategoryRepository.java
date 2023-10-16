package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Category;
import com.cogy_ecommerce_service.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

    List<Category> findAll();

    @Modifying
    @Query("update Category c set c.active = 0 where c.id = :id")
    void softDelete(@Param("id") UUID id);

    List<SubCategory> findBySubCategoriesId(UUID subCategoryId);
}
