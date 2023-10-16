package com.cogy_ecommerce_service.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BuyerSimpleResponseDTO {

    private String username;

    private String avatar;
}
