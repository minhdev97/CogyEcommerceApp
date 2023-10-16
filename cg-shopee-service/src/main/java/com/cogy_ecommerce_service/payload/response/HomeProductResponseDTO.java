package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeProductResponseDTO {

    private String id;

    private String name;

    private String image;

    private Double minPriceOfVariants;

    private Long numberOfPurchase;

    private Long view;

    private LocalDateTime creationTime;

    private String province;

    private Double discountPrice;

    private VoucherProductDetailDTO vouchers;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s, image = %s",
                getId(), getName(), getImage());
    }
}
