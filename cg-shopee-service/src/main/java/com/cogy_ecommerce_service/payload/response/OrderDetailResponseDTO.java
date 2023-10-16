package com.cogy_ecommerce_service.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OrderDetailResponseDTO {
    private Integer quantity;

    private String productName;

    private String image;

    private String color;

    private String size;

    private int price;
}
