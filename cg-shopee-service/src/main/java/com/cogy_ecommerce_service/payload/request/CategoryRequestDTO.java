package com.cogy_ecommerce_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDTO {

    private String id;

    @NotBlank
    private String name;

    @URL
    private String image;

    @Override
    public String toString () {
        return String.format("id = %s, name = %s", getId() , getName());
    }

}
