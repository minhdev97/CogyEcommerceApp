package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Product;
import com.cogy_ecommerce_service.payload.request.RequestProductDTO;
import com.cogy_ecommerce_service.payload.response.*;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface ProductConverter {

    ProductToEditResponseDTO convertEntityToEditResponse(Product product);

    ManagementProductResponseDTO convertEntityToResponse(Product product);

    Product convertRequestCreateToEntity(RequestProductDTO requestProductDTO);

    List<ManagementProductResponseDTO> convertListEntityToListDTO(List<Product> products);

    Page<HomeProductResponseDTO> convertPageEntityToPageDTO(Page<Product> products);

    PageResponseDTO<HomeProductResponseDTO> convertPageToPageResponse(Page<HomeProductResponseDTO> page);

    ProductDetailResponseDTO converterEntityToResponse(Product product,List<VoucherProductDetailDTO> vouchers);

    RelatedProductResponseDTO converterEntityToRelatedProductResponse(Product product);

    List<RelatedProductResponseDTO> convertListEntityToListRelatedProductDTO(List<Product> products);

    HomeProductResponseDTO converterEntityToHomeResponse(Product product);

    SearchResponseDTO convertSearchListToSearchResponse(Collection<SubCategoryResponseDTO> subCategoryList, PageResponseDTO<HomeProductResponseDTO> searchData);

    ProductToCreateVoucherDTO convertEntityToCreateVoucherResponse(Product product);

    List<ProductToCreateVoucherDTO> convertListEntityToListCreateVoucherResponse(List<Product> products);


    ProductInfoResponseDTO convertEntityToInfoResponse(Product product);

    List<ProductInfoResponseDTO> convertListEntityToListInfoResponse(List<Product> products);

    CategoryProductPageResponseDTO convertEntityToCategoryPageResponse(PageResponseDTO<HomeProductResponseDTO> products, List<SubCategoryResponseDTO> subCategoryList);

    ProductVoucherResponseDTO convertEntityToProductVoucherResponse(VoucherResponseDTO voucherResponseDTO, List<ProductInfoResponseDTO> products);

    List<HomeProductResponseDTO> convertEntityToProductList(List<Product> products);
}
