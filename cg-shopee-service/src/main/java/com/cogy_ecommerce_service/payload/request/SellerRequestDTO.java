package com.cogy_ecommerce_service.payload.request;

import lombok.Builder;
import lombok.Getter;
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
public class SellerRequestDTO {
    private String id;

    @NotBlank
    @Size(min = 5, max = 30)
    private String name;

    @URL
    private String image;

    @NotNull
    @Valid
    private List<SellerLocationRequestDTO> locations;
}
