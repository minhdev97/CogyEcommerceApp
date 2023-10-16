package com.cogy_ecommerce_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariantRequestDTO {

    private String id;

    @NotNull
    private SizeRequestDTO size;

    @NotNull
    private ColorRequestDTO color;

    @NotNull
    @PositiveOrZero
    private Double importPrice;

    @NotNull
    @PositiveOrZero
    private Double salePrice;

    @NotNull
    @PositiveOrZero
    private Integer stock;

    private boolean isShown;

    @NotNull
    @Positive
    private Long weight;

    @Override
    public String toString() {
        return String.format("id = %s, " +
                        "importPrice = %f, " +
                        "salePrice = %f, " +
                        "stock = %d, ",
                getId(), getImportPrice(), getSalePrice(), getStock());
    }
}
