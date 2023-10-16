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
public class UserLocationRequestDTO {
    private String id;

    @NotBlank
    private String deputyName;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String province;

    @NotBlank
    private String district;

    @NotBlank
    private String ward;

    private String hamlet;

    @NotBlank
    private String address;

    private String typeAddress;

    private boolean isDefaultAddress;
}
