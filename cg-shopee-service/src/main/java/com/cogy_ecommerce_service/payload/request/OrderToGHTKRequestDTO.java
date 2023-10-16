package com.cogy_ecommerce_service.payload.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class OrderToGHTKRequestDTO {

    private List<ProductToGHTKRequestDTO> products;

    private OrderDetailToGHTKRequestDTO order;
}
