package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartLineResponseDTO {

    private String id;

    private Integer quantity;

    private Double salePrice;

    private String productName;

    private String image;

    private String color;

    private String size;

    private String shopName;

    private String sellerID;

    private String variantID;

    private Long weight;

    private Integer stock;

    private List<SellerLocationResponseDTO> sellerLocation;
}
