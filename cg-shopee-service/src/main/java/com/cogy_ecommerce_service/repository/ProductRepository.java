package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Product;
import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.payload.response.HomeProductResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface ProductRepository extends JpaRepository<Product, UUID> {

    List<Product> findByActiveTrue();

    List<Product> findBySeller(Seller seller);

    Page<Product> findByIsShownTrue(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE is_shown = true ORDER BY view DESC LIMIT 20 OFFSET 0 ", nativeQuery = true)
    List<Product> findByIsShownTrue();
    Page<Product> findProductBySubCategoryId(Pageable pageable,UUID subCategory);

    @Query("SELECT p FROM Product p WHERE p.isShown = true and (lower(p.name) like lower(concat('%', :name, '%')) or lower(p.description) like lower(concat('%', :description, '%')) or lower(p.subCategory.name) like lower(concat('%', :subCategoryName, '%'))) and p.minPriceOfVariants between :minPrice and :maxPrice")
    Page<Product> findByIsShownTrueAndNameContainsOrDescriptionContainsOrSubCategoryNameContains(String name, String description, String subCategoryName, Pageable pageable, Double minPrice, Double maxPrice);

    @Query("SELECT distinct p FROM Product p join p.seller seller join seller.locations sellerLocation WHERE sellerLocation.province in :province and p.isShown = true and (lower(p.name) like lower(concat('%', :name, '%')) or lower(p.description) like lower(concat('%', :description, '%')) or lower(p.subCategory.name) like lower(concat('%', :subCategoryName, '%'))) and p.minPriceOfVariants between :minPrice and :maxPrice")
    Page<Product> findByIsShownTrueAndNameContainsOrDescriptionContainsOrSubCategoryNameContainsAndProvince(String name, String description, String subCategoryName, Pageable pageable, Double minPrice, Double maxPrice, List<String> province);

    Optional<Product> findByIdAndActiveTrueAndIsShownTrue(UUID id);

    @Query("SELECT p FROM Product p " +
            "JOIN p.subCategory sc " +
            "WHERE sc.id = :subCategoryId " +
            "AND p.active = true " +
            "AND p.isShown = true " +
            "AND p.id <> :productId " +
            "ORDER BY p.view DESC")
    Page<Product> findTop10ViewsRelatedProductsBySubCategoryId(UUID subCategoryId, UUID productId, Pageable pageable);

    @Query("SELECT p FROM Product p where p.subCategory.category.id = :categoryId")
    Page<Product> findProductsByCategoryId(@Param("categoryId") UUID categoryId, Pageable pageable);

    @Query("SELECT p from Product p where p.subCategory.id in :subCategory and p.minPriceOfVariants between :minPrice and :maxPrice")
    Page<Product> findProductsBySubCategoryId(@Param("subCategory") List<UUID> subCategory,@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,Pageable pageable);

    @Query("select p from Product p where p.subCategory.category.id = :categoryId and p.minPriceOfVariants between :minPrice and :maxPrice")
    Page<Product> findProductsByCategoryIdAndPriceRange(@Param("categoryId") UUID categoryId, @Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,Pageable pageable);

    @Query("select p from Product p where p.subCategory.id = :subCategoryId and p.minPriceOfVariants between :minPrice and :maxPrice")
    Page<Product> findProductsBySubCategoryIdAndPriceRange(@Param("subCategoryId") UUID subCategoryId, @Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,Pageable pageable);

    @Query("select distinct p from Product p join p.seller seller join seller.locations sellerLocation where sellerLocation.province in :province and p.minPriceOfVariants between :minPrice and :maxPrice and p.subCategory.category.id = :categoryId")
    Page<Product> findProductsByProvinceName(@Param("province") List<String> province,@Param("categoryId") UUID id, @Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice,Pageable pageable);

    @Query("select distinct p from Product p join p.seller seller join seller.locations sellerLocation where sellerLocation.province in :province and p.minPriceOfVariants between :minPrice and :maxPrice and p.subCategory.id in :subCategory and p.subCategory.category.id = :categoryId" )
    Page<Product> findProductsByProvinceNameAndSubCategoryId(@Param("subCategory") List<UUID> subCategory,@Param("province") List<String> province,@Param("categoryId") UUID id, Double minPrice, Double maxPrice, Pageable pageable);


}
