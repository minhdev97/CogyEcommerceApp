package com.cogy_ecommerce_service.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class OrderUserResponseDTO {
    private String id;

    private SellerResponseDTO seller;

    private Double totalPrice;

    private String status;

    private LocalDateTime requestTime;

    private String deliveryService;

    private String cogyOrderCode;

    private String deliveryTrackingCode;

    private List<OrderDetailBoResponseDTO> orderDetails;
}
