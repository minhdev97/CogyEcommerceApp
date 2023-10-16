package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String id;

    private String fullName;

    private String username;

    private String email;

    private String password;

    private String address;

    private String phone;

    private String avatar;

    private Boolean activated;
    
    private String rememberToken;
}
