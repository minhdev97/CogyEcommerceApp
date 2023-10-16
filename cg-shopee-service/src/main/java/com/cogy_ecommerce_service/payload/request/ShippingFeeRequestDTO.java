package com.cogy_ecommerce_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingFeeRequestDTO {
    @NotBlank
    private String shopName;

    @NotBlank
    private String userLocationId;

    @NotBlank
    @Positive
    private Long totalWeight;
}
