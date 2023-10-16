package com.cogy_ecommerce_service.payload.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
public class PostOrderRequestDTO {
    @NotBlank
    private String orderId;

    private String sellerLocationId;

    private boolean isSellerBringGoodsToPostOffice;
}
