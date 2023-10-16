package com.cogy_ecommerce_service.payload.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Collection;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductToCreateVoucherDTO {
    private String id;

    private String name;

    private String image;

    private String categoryId;

    private String categoryName;

    private String categoryImage;

    private String subCategoryId;

    private String subCategoryName;

    private Double minPriceOfVariants;

}
