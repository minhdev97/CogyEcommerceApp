package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.CategoryConverter;
import com.cogy_ecommerce_service.converter.PhotoConverter;
import com.cogy_ecommerce_service.converter.ProductConverter;
import com.cogy_ecommerce_service.converter.SellerConverter;
import com.cogy_ecommerce_service.converter.SubCategoryConverter;
import com.cogy_ecommerce_service.converter.VariantConverter;
import com.cogy_ecommerce_service.converter.VoucherConverter;
import com.cogy_ecommerce_service.entity.Photo;
import com.cogy_ecommerce_service.entity.Product;
import com.cogy_ecommerce_service.entity.SellerLocation;
import com.cogy_ecommerce_service.entity.SubCategory;
import com.cogy_ecommerce_service.entity.Variant;
import com.cogy_ecommerce_service.entity.Voucher;
import com.cogy_ecommerce_service.payload.request.RequestProductDTO;
import com.cogy_ecommerce_service.payload.response.*;
import com.cogy_ecommerce_service.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class ProductConverterImpl implements ProductConverter {

    private final PhotoConverter photoConverter;

    private final VariantConverter variantConverter;

    private final VoucherConverter voucherConverter;

    private final SubCategoryConverter subCategoryConverter;

    private final CategoryConverter categoryConverter;

    private final SellerConverter sellerConverter;


    @Override
    public ProductToEditResponseDTO convertEntityToEditResponse(Product product) {
        SubCategory subCategoryEntity = product.getSubCategory();
        CategoryModifyResponseDTO category = categoryConverter.convertEntityToModifyResponse(subCategoryEntity.getCategory());
        SubCategoryResponseDTO subcategory = subCategoryConverter.convertEntityToResponse(subCategoryEntity);
        List<ManagementVariantResponseDTO> variants = variantConverter.convertListEntityToListDto(
                (List<Variant>) product.getVariants()
        );
        List<PhotoResponseDTO> photos = photoConverter.convertListEntityToListDTO(
                (List<Photo>) product.getPhotos()
        );
        return ProductToEditResponseDTO
                .builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .isShown(product.isShown())
                .description(product.getDescription())
                .definitionOfColor(product.getDefinitionOfColor())
                .definitionOfSize(product.getDefinitionOfSize())
                .category(category)
                .subCategory(subcategory)
                .variants(variants)
                .photos(photos)
                .build();
    }


    @Override
    public ManagementProductResponseDTO convertEntityToResponse(Product product) {
        return ManagementProductResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .isShown(product.isShown())
                .subCategory(subCategoryConverter.convertEntityToResponse(product.getSubCategory()))
                .numberOfPurchase(product.getNumberOfPurchase())
                .definitionOfColor(product.getDefinitionOfColor())
                .definitionOfSize(product.getDefinitionOfSize())
                .variants(variantConverter.convertListEntityToListDto((List<Variant>) product.getVariants()))
                .view(product.getView())
                .build();
    }


    @Override
    public Product convertRequestCreateToEntity(RequestProductDTO requestDTO) {
        return Product.builder()
                .id(requestDTO.getId() == null ? UUID.randomUUID() : UUID.fromString(requestDTO.getId()))
                .active(true)
                .isShown(requestDTO.isShown())
                .name(requestDTO.getName())
                .image(requestDTO.getImage())
                .description(requestDTO.getDescription())
                .view(0L)
                .numberOfPurchase(0L)
                .definitionOfColor(requestDTO.getDefinitionOfColor())
                .definitionOfSize(requestDTO.getDefinitionOfSize())
                .build();
    }


    @Override
    public List<ManagementProductResponseDTO> convertListEntityToListDTO(List<Product> products) {
        return products.stream().map(this::convertEntityToResponse).toList();
    }

    @Override
    public HomeProductResponseDTO converterEntityToHomeResponse(Product product) {
        Double minPriceOfVariants = product.getMinPriceOfVariants();
        Collection<Variant> variants = product.getVariants();
        Double discountPrice = null;
        for (Variant variant : variants) {
            Double salePrice = variant.getSalePrice();
            if (salePrice.equals(minPriceOfVariants)) {
                discountPrice = variant.getDiscountPrice();
                break;
            }
        }
        Voucher voucher = null;
        if (product.getVoucher() != null && product.getVoucher().getStatus() == Voucher.Status.ACTIVE) {
            voucher = product.getVoucher();
        }
        VoucherProductDetailDTO voucherProductDetailDTO = null;
        if (voucher != null) {
            voucherProductDetailDTO = voucherConverter.convertEntityToVoucherProductDetail(voucher);
        }
        return HomeProductResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .minPriceOfVariants(product.getMinPriceOfVariants())
                .numberOfPurchase(product.getNumberOfPurchase())
                .image(product.getImage())
                .view(product.getView())
                .creationTime(product.getCreationTime())
                .province(product.getSeller().getLocations().stream().filter(SellerLocation::isDefaultAddress).map(SellerLocation::getProvince).findFirst().get())
                .discountPrice(discountPrice)
                .vouchers(voucherProductDetailDTO)
                .build();
    }

    @Override
    public Page<HomeProductResponseDTO> convertPageEntityToPageDTO(Page<Product> products) {
        List<HomeProductResponseDTO> dtoList = products.getContent().stream().map(this::converterEntityToHomeResponse).toList();
        return  new PageImpl<>(dtoList,products.getPageable(),products.getTotalElements());
    }

    @Override
    public List<HomeProductResponseDTO> convertEntityToProductList(List<Product> products) {
        return products.stream().map(this::converterEntityToHomeResponse).toList();
    }

    @Override
    public PageResponseDTO<HomeProductResponseDTO> convertPageToPageResponse(Page<HomeProductResponseDTO> page) {
        return PageResponseDTO.<HomeProductResponseDTO>builder()
                .content(page.getContent())
                .pageSize(page.getSize())
                .totalPages(page.getTotalPages())
                .hasNext(page.hasNext())
                .hasPrevious(page.hasPrevious())
                .totalElements(page.getTotalElements())
                .currentPageNumber(page.getNumber())
                .build();
    }

    @Override
    public ProductDetailResponseDTO converterEntityToResponse(Product product,List<VoucherProductDetailDTO> vouchers) {
        return ProductDetailResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .description(product.getDescription())
                .image(product.getImage())
                .view(product.getView())
                .numberOfPurchase(product.getNumberOfPurchase())
                .definitionOfColor(product.getDefinitionOfColor())
                .definitionOfSize(product.getDefinitionOfSize())
                .photos(photoConverter.convertListEntityToListUrlDTO(product.getPhotos().stream().toList()))
                .variants(variantConverter.convertListEntityToListVariantDto(product.getVariants().stream().toList()))
                .subCategory(subCategoryConverter.convertEntityToSubCategoryResponse(product.getSubCategory()))
                .category(categoryConverter.convertEntityToCategoryDetailResponse(product.getSubCategory().getCategory()))
                .shop(sellerConverter.convertEntityToResponse(product.getSeller()))
                .vouchers(vouchers)
                .build();
    }

    @Override
    public RelatedProductResponseDTO converterEntityToRelatedProductResponse(Product product) {
        return RelatedProductResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .view(product.getView())
                .numberOfPurchase(product.getNumberOfPurchase())
                .minOfPrice(product.getMinPriceOfVariants())
                .build();
    }

    @Override
    public List<RelatedProductResponseDTO> convertListEntityToListRelatedProductDTO(List<Product> products) {
        return products.stream().map(this::converterEntityToRelatedProductResponse).toList();
    }



    @Override
    public SearchResponseDTO convertSearchListToSearchResponse(Collection<SubCategoryResponseDTO> subCategoryList, PageResponseDTO<HomeProductResponseDTO> searchData) {
        return SearchResponseDTO.builder()
                .searchData(searchData)
                .subCategoryList(subCategoryList)
                .build();
    }

    @Override
    public ProductToCreateVoucherDTO convertEntityToCreateVoucherResponse(Product product) {
        return ProductToCreateVoucherDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .categoryId(product.getSubCategory().getCategory().getId().toString())
                .categoryName(product.getSubCategory().getCategory().getName())
                .categoryImage(product.getSubCategory().getCategory().getImage())
                .subCategoryId(product.getSubCategory().getId().toString())
                .subCategoryName(product.getSubCategory().getName())
                .minPriceOfVariants(product.getMinPriceOfVariants())
                .build();
    }

    @Override
    public List<ProductToCreateVoucherDTO> convertListEntityToListCreateVoucherResponse(List<Product> products) {
        return products.stream().map(this::convertEntityToCreateVoucherResponse).toList();
    }

    @Override
    public ProductInfoResponseDTO convertEntityToInfoResponse(Product product) {
        return ProductInfoResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .build();
    }
    @Override
    public List<ProductInfoResponseDTO> convertListEntityToListInfoResponse(List<Product> products) {
        return products.stream().map(this::convertEntityToInfoResponse).toList();
    }

    @Override
    public CategoryProductPageResponseDTO convertEntityToCategoryPageResponse(PageResponseDTO<HomeProductResponseDTO> products, List<SubCategoryResponseDTO> subCategoryList) {
        return CategoryProductPageResponseDTO.builder()
                .products(products)
                .subCategoryList(subCategoryList)
                .build();
    }

    @Override
    public ProductVoucherResponseDTO convertEntityToProductVoucherResponse(VoucherResponseDTO voucherResponseDTO, List<ProductInfoResponseDTO> products) {
        return ProductVoucherResponseDTO.builder()
                .voucherResponseDTO(voucherResponseDTO)
                .products(products)
                .build();
    }
}
