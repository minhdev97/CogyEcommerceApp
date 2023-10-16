package com.cogy_ecommerce_service.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import java.util.Collection;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelatedProductResponseDTO {
    private String id;

    private String name;

    private String image;

    private Long view;

    private Long numberOfPurchase;

    private Double minOfPrice;
}
