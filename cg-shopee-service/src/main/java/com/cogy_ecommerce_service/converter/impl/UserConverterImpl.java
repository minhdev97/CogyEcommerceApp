package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.UserConverter;
import com.cogy_ecommerce_service.converter.UserLocationConverter;
import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.payload.request.ProfileRequestDTO;
import com.cogy_ecommerce_service.payload.response.BuyerSimpleResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProfileResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserConverterImpl implements UserConverter {
    private final UserLocationConverter userLocationConverter;

    @Override
    public BuyerSimpleResponseDTO convertEntityToBuyerSimpleResponse(User user) {
        return BuyerSimpleResponseDTO
                .builder()
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build();
    }

    @Override
    public ProfileResponseDTO convertEntityToProfileResponse(User user) {
        return ProfileResponseDTO
                .builder()
                .id(user.getId().toString())
                .avatar(user.getAvatar())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .gender(user.getGender())
                .locations(userLocationConverter.convertListEntityToListResponse(user.getLocations()))
                .phone(user.getPhone())
                .build();
    }

}
