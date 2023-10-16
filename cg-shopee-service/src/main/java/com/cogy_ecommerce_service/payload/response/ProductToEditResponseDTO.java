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
public class ProductToEditResponseDTO {

    protected String id;

    protected String name;

    protected String image;

    protected SubCategoryResponseDTO subCategory;

    protected boolean isShown;

    private List<ManagementVariantResponseDTO> variants;

    private String definitionOfColor;

    private String definitionOfSize;

    private String description;

    private List<PhotoResponseDTO> photos;

    private CategoryModifyResponseDTO category;


    @Override
    public String toString() {
        return String.format("id = %s, name = %s, image = %s, description = %s", getId(), getName(), getImage(), getDescription());
    }
}