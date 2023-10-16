package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailResponseDTO {

    private String id;

    private String name;

    private String description;

    private String image;

    private Long view;

    private Long numberOfPurchase;

    private String definitionOfColor;

    private String definitionOfSize;

    private Collection<PhotoUrlResponseDTO> photos;

    private Collection<VariantDetailResponseDTO> variants;

    private SubCategoryDetailResponseDTO subCategory;

    private CategoryDetailResponseDTO category;

    private SellerResponseDTO shop;

    private List<VoucherProductDetailDTO> vouchers;
}
