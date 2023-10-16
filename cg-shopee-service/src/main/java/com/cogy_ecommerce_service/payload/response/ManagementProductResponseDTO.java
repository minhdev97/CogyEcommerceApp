package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagementProductResponseDTO {

    protected String id;

    protected String name;

    protected String image;

    protected SubCategoryResponseDTO subCategory;

    protected Long numberOfPurchase;

    protected boolean isShown;

    private List<ManagementVariantResponseDTO> variants;

    private String definitionOfColor;

    private String definitionOfSize;

    private Long view;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s, image = %s",
                getId(), getName(), getImage());
    }

}
