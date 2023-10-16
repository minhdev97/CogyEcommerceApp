package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {

    private String username;

    private String fullName;

    private Set<RoleResponseDto> roles;

    private UUID cartId;

    private String token;

    private UUID userId;

    private String avatar;

    private SellerResponseDTO seller;

}
