package com.cogy_ecommerce_service.payload.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDTO {
    private String id;

    private String fullName;

    private String gender;

    private String email;

    private List<UserLocationResponseDTO> locations;

    private String phone;

    private String avatar;

}
