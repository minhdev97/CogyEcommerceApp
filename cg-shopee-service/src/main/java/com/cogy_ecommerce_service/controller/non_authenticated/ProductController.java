package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.payload.response.CategoryProductPageResponseDTO;
import com.cogy_ecommerce_service.payload.response.HomeProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.PageResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProductDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProductToCreateVoucherDTO;
import com.cogy_ecommerce_service.payload.response.RelatedProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.SearchResponseDTO;
import com.cogy_ecommerce_service.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    @GetMapping()
    public ResponseEntity<?> getProductsByPageNumber(Pageable pageable) {
        Pageable pageable1 = PageRequest.of
                (pageable.getPageNumber(),pageable.getPageSize(),Sort.Direction.DESC,"view");
        PageResponseDTO<HomeProductResponseDTO> products = productService.findAllProduct(pageable1);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    @GetMapping("/subcategory/{id}")
    public ResponseEntity<?> getProductsBySubCategory(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "10") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "name") String sort,
            @RequestParam(name = "direction", required = false, defaultValue = "asc") String direction,
            @RequestParam(name = "subCategory", required = false) List<String> subCategory,
            @RequestParam(name = "province", required = false) List<String> province,
            @RequestParam(name = "minPrice", required = false ,defaultValue = "0") Double minPrice,
            @RequestParam(name = "maxPrice", required = false,defaultValue = "100000000") Double maxPrice,
            @RequestParam(name = "category", required = false) String categoryId,
            @PathVariable String id) {
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, sortDirection, sort);
        CategoryProductPageResponseDTO products;

        if (subCategory.size() == 0) {
            products = productService.findProductsBySubCategoryId(pageable,id,minPrice,maxPrice,categoryId);
        } else {
            products = productService.findProductsBySubCategoryIdList(pageable,subCategory,id,minPrice,maxPrice);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getProductsByCategory(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "12") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "name") String sort,
            @RequestParam(name = "direction", required = false, defaultValue = "asc") String direction,
            @RequestParam(name = "subCategory", required = false) List<String> subCategory,
            @RequestParam(name = "province", required = false) List<String> province,
            @RequestParam(name = "minPrice", required = false ,defaultValue = "0") Double minPrice,
            @RequestParam(name = "maxPrice", required = false,defaultValue = "100000000") Double maxPrice,
            @PathVariable String id) {
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, sortDirection, sort);
        CategoryProductPageResponseDTO products;

        if (subCategory.size() == 0) {
            if (province.size() == 0 ) {
                products = productService.findProductsByCategoryId(pageable,id,minPrice,maxPrice);
            } else {
                products = productService.findProductsByProvinceList(pageable,province,id,minPrice,maxPrice);
            }
        } else if (province.size() == 0) {
            products = productService.findProductsBySubCategoryIdList(pageable,subCategory,id,minPrice,maxPrice);
            } else {
            products = productService.findProductsBySubCategoryIdListAndProvinceList(pageable,subCategory,province,id,minPrice,maxPrice);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/search/")
    public ResponseEntity<?> getProductsBySearch(
            @RequestParam("search") Optional<String> search,
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "12") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "name") String sort,
            @RequestParam(name = "direction", required = false, defaultValue = "asc") String direction,
            @RequestParam(name = "province", required = false) List<String> province,
            @RequestParam(name = "minPrice", required = false ,defaultValue = "0") Double minPrice,
            @RequestParam(name = "maxPrice", required = false,defaultValue = "100000000") Double maxPrice
    ) {
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, sortDirection,sort);
        SearchResponseDTO products;
        if (province.size() == 0) {
             products = productService.findBySearchParams(pageable,search.get(),minPrice,maxPrice);
        } else {
            products = productService.findBySearchParamsAndProvinceList(pageable,search.get(),province,minPrice,maxPrice);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findProductDetailById(@PathVariable String id) {
        ProductDetailResponseDTO productDetailResponseDTO = productService.findProductDetailById(id);
        return  new ResponseEntity<>(productDetailResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/{id}/related-products")
    public ResponseEntity<?> findTop10ViewsRelatedProductsBySubCategoryId(@PathVariable String id) {
        List<RelatedProductResponseDTO> responseDTOS = productService.findTop10ViewsRelatedProductsBySubCategoryId(id);
        return  new ResponseEntity<>(responseDTOS, HttpStatus.OK);
    }


    @GetMapping("/recommendation")
    public ResponseEntity<?> getRecommendationProduct(Pageable pageable){
        PageResponseDTO<HomeProductResponseDTO> homeProductResponseDTOPageResponseDTO = productService.findAllProduct(pageable);
        return new ResponseEntity<>(homeProductResponseDTOPageResponseDTO , HttpStatus.OK );
    }


    @GetMapping("/sellers/{sellerId}")
    public ResponseEntity<?> findProductsBySellerId(@PathVariable String sellerId) {
        List<ProductToCreateVoucherDTO> products = productService.findProductsBySellerId(sellerId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/top-suggest")
    public ResponseEntity<?> find20SuggestProduct() {
        List<HomeProductResponseDTO> products = productService.find20SuggestProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
