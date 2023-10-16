package com.cogy_ecommerce_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryRequestDTO {

    private String id;

    @NotBlank
    private String name;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s", getId(), getName());
    }
}
