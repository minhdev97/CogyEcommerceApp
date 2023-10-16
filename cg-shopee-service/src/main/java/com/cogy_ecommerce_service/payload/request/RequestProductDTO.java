package com.cogy_ecommerce_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Valid
public class RequestProductDTO {

    private String id;

    @NotBlank
    @Size(max = 50)
    private String name;

    @URL
    private String image;

    private String description;

    @NotNull
    private SubCategoryRequestDTO subCategory;

    private boolean isShown;

    @NotNull
    private List<VariantRequestDTO> variants;

    @NotNull
    private List<PhotoRequestDTO> photos;

    @NotBlank
    private String definitionOfColor;

    @NotBlank
    private String definitionOfSize;



    @Override
    public String toString() {
        return String.format("name = %s, image = %s, description = %s", getName(), getImage(), getDescription());
    }
}
