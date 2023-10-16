package com.cogy_ecommerce_service.payload.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

@Getter
@Setter
@Builder
@Valid
public class SellerLocationRequestDTO {
    private String id;

    @NotBlank
    @Size(min = 1, max = 30)
    private String deputyName;

    @NotBlank
    @Size(min = 10, max = 10)
    private String phoneNumber;

    @NotBlank
    private String province;

    @NotBlank
    private String district;

    @NotBlank
    private String ward;

    @Size(max = 30)
    private String hamlet;

    @Size(max = 100)
    private String address;

    @Size(max = 20)
    private String typeAddress;

    private boolean isDefaultAddress;

}
