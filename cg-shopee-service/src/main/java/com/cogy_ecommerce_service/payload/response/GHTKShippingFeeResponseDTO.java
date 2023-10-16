package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GHTKShippingFeeResponseDTO {
    private Boolean success;

    private String message;

    private GHTKShippingFeeDetailResponseDTO fee;
}