package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface SubCategoryRepository extends JpaRepository<SubCategory, UUID> {

    //use to mock up data
    @Query(value = "SELECT * FROM SUB_CATEGORY ORDER BY RAND() LIMIT 1", nativeQuery = true)
    SubCategory findRandomEntity();


    List<SubCategory> findByNameContains(String name);

    SubCategory findByName(String name);

    @Query(value = "SELECT * FROM SUB_CATEGORY ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<SubCategory> findRandomSubcategories();
}
