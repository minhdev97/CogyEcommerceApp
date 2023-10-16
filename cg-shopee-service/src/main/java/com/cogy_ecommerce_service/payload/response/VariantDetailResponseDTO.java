package com.cogy_ecommerce_service.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VariantDetailResponseDTO {
    private String id;

    private String size;

    private String color;

    private Double salePrice;

    private Integer stock;

    private Double discountPrice;

}