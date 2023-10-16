package com.cogy_ecommerce_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequestDTO {
    private String id;

    @NotBlank
    private String fullName;

    private String gender;

    @NotBlank
    private String email;

    private List<UserLocationRequestDTO> locations;
    
    @NotBlank
    private String phone;

    private String avatar;
}
