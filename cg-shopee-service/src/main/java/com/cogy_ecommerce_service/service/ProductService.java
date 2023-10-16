package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.entity.Voucher;
import com.cogy_ecommerce_service.payload.request.RequestProductDTO;
import com.cogy_ecommerce_service.payload.response.CategoryProductPageResponseDTO;
import com.cogy_ecommerce_service.payload.response.HomeProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.PageResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProductDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.ManagementProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProductToCreateVoucherDTO;
import com.cogy_ecommerce_service.payload.response.ProductToEditResponseDTO;
import com.cogy_ecommerce_service.payload.response.RelatedProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.SearchResponseDTO;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductService {

    ManagementProductResponseDTO save(String sellerId, RequestProductDTO requestProductDTO);

    ProductToEditResponseDTO findByIdToEdit(String sellerId, String id);

    void setActiveFalse(String sellerId, String id);

    List<ManagementProductResponseDTO> findBySellerId(String id);

    PageResponseDTO<HomeProductResponseDTO> findAllProduct(Pageable pageable);

    ManagementProductResponseDTO create(String sellerId, RequestProductDTO requestProductDTO);

    PageResponseDTO<HomeProductResponseDTO> findByCategoryId(Pageable pageable, String id,Double minPrice,Double maxPrice);

    SearchResponseDTO findBySearchParams(Pageable pageable, String search, Double minPrice, Double maxPrice);

    ProductDetailResponseDTO findProductDetailById(String id);

    List<RelatedProductResponseDTO> findTop10ViewsRelatedProductsBySubCategoryId(String subCategoryId);

    CategoryProductPageResponseDTO findProductsByCategoryId (Pageable pageable, String id, Double minPrice,Double maxPrice);

    CategoryProductPageResponseDTO findProductsBySubCategoryId(Pageable pageable, String id, Double minPrice, Double maxPrice, String categoryId);

    List<ProductToCreateVoucherDTO> findProductsBySellerId(String id);

    CategoryProductPageResponseDTO findProductsBySubCategoryIdList(Pageable pageable, List<String> subCategory, String id,Double minPrice, Double maxPrice);

    CategoryProductPageResponseDTO findProductsByProvinceList(Pageable pageable, List<String> province, String id, Double minPrice, Double maxPrice);

    CategoryProductPageResponseDTO findProductsBySubCategoryIdListAndProvinceList(Pageable pageable, List<String> subCategory, List<String> province, String id, Double minPrice, Double maxPrice);

    SearchResponseDTO findBySearchParamsAndProvinceList(Pageable pageable, String search, List<String> province, Double minPrice, Double maxPrice);


    List<HomeProductResponseDTO> find20SuggestProducts();

    void checkCurrentTimeAndSetDiscountPrice(Voucher voucher, LocalDateTime currentTime);
}
