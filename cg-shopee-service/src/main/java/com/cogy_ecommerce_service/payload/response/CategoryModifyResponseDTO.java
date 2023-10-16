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
public class CategoryModifyResponseDTO {

    private String id;

    private String name;

    private String image;

    private List<SubCategoryResponseDTO> subCategories;

    @Override
    public String toString () {
        return String.format("id = %s, name = %s", getId() , getName());
    }

}
