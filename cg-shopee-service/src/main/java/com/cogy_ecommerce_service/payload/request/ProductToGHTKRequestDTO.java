package com.cogy_ecommerce_service.payload.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductToGHTKRequestDTO {
    private String name;
    //String - Tên hàng hóa

    private Double weight;

    private Integer quantity;

    private String product_code;

    private Integer price;
    //Integer - Giá trị hàng hóa

}
