package com.cogy_ecommerce_service.payload.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SellerLocationResponseDTO {
    private String id;

    private String deputyName;

    private String phoneNumber;

    private String province;

    private String district;

    private String ward;

    private String hamlet;

    private String address;

    private String typeAddress;

    private boolean isDefaultAddress;
}
