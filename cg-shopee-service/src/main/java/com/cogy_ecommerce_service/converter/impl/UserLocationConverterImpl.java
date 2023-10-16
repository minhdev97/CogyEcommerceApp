package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.UserLocationConverter;
import com.cogy_ecommerce_service.entity.UserLocation;
import com.cogy_ecommerce_service.payload.request.UserLocationRequestDTO;
import com.cogy_ecommerce_service.payload.response.UserLocationResponseDTO;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class UserLocationConverterImpl implements UserLocationConverter {

    @Override
    public List<UserLocation> convertListRequestToListEntity(List<UserLocationRequestDTO> locations) {
        return locations.stream().map(this::convertRequestToEntity).collect(Collectors.toList());
    }

    @Override
    public List<UserLocationResponseDTO> convertListEntityToListResponse(Collection<UserLocation> userLocations) {
        return userLocations.stream().map(this::convertEntityToResponse).collect(Collectors.toList());
    }


    @Override
    public UserLocation convertRequestToEntity(UserLocationRequestDTO requestDTO) {
        return UserLocation
                .builder()
                .id(requestDTO.getId() == null || requestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(requestDTO.getId()))
                .deputyName(requestDTO.getDeputyName())
                .address(requestDTO.getAddress())
                .province(requestDTO.getProvince())
                .isDefaultAddress(requestDTO.isDefaultAddress())
                .district(requestDTO.getDistrict())
                .ward(requestDTO.getWard())
                .hamlet(requestDTO.getHamlet())
                .phoneNumber(requestDTO.getPhoneNumber())
                .typeAddress(requestDTO.getTypeAddress())
                .build();
    }


    @Override
    public UserLocationResponseDTO convertEntityToResponse(UserLocation userLocation) {
        return UserLocationResponseDTO
                .builder()
                .id(userLocation.getId().toString())
                .deputyName(userLocation.getDeputyName())
                .phoneNumber(userLocation.getPhoneNumber())
                .province(userLocation.getProvince())
                .district(userLocation.getDistrict())
                .ward(userLocation.getWard())
                .hamlet(userLocation.getHamlet())
                .address(userLocation.getAddress())
                .typeAddress(userLocation.getTypeAddress())
                .isDefaultAddress(userLocation.isDefaultAddress())
                .build();
    }

}
