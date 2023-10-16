package com.cogy_ecommerce_service.payload.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ManagementVariantResponseDTO {
    private String id;

    private SizeResponseDTO size;

    private ColorResponseDTO color;

    private Double importPrice;

    private Double salePrice;

    private Integer stock;

    private Long weight;

    private boolean isShown;

    @Override
    public String toString() {
        return String.format("id = %s, " +
                        "importPrice = %f, " +
                        "salePrice = %f, " +
                        "stock = %d, ",
                getId(), getImportPrice(), getSalePrice(), getStock());
    }
}
