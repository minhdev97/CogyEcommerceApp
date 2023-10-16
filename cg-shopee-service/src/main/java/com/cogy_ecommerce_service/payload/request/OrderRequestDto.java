package com.cogy_ecommerce_service.payload.request;

import com.cogy_ecommerce_service.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    private String id;

    @NotBlank
    private String buyerID;

    private String sellerID;

    private Double totalPrice;

    private Double shippingFee = 0.0;

    private String deliveryService;

    private Order.Status status;

    private List<OrderDetailRequestDto> orderDetailRequestDtoList;

}
