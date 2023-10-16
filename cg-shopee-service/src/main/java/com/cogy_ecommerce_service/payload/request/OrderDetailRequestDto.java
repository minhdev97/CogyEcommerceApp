package com.cogy_ecommerce_service.payload.request;

import com.cogy_ecommerce_service.payload.response.OrderBoResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailRequestDto {

    private Integer quantity;

    private Double price;

    private String variantID;

    private String SellerID;
}
