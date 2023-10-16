package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.SellerLocationConverter;
import com.cogy_ecommerce_service.entity.SellerLocation;
import com.cogy_ecommerce_service.payload.request.SellerLocationRequestDTO;
import com.cogy_ecommerce_service.payload.response.HomeSellerLocationsDTO;
import com.cogy_ecommerce_service.payload.response.SellerLocationResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@Transactional
@RequiredArgsConstructor
public class SellerLocationConverterImpl implements SellerLocationConverter {
    @Override
    public SellerLocation convertRequestToEntity(SellerLocationRequestDTO requestDTO) {
        return SellerLocation
                .builder()
                .id(requestDTO.getId() == null ? UUID.randomUUID() : UUID.fromString(requestDTO.getId()))
                .typeAddress(requestDTO.getTypeAddress())
                .deputyName(requestDTO.getDeputyName())
                .phoneNumber(requestDTO.getPhoneNumber())
                .province(requestDTO.getProvince())
                .district(requestDTO.getDistrict())
                .ward(requestDTO.getWard())
                .hamlet(requestDTO.getHamlet())
                .address(requestDTO.getAddress())
                .isDefaultAddress(requestDTO.isDefaultAddress())
                .build();
    }

    @Override
    public SellerLocationResponseDTO convertEntityToResponse(SellerLocation sellerLocation) {
        return SellerLocationResponseDTO
                .builder()
                .id(sellerLocation.getId().toString())
                .typeAddress(sellerLocation.getTypeAddress())
                .deputyName(sellerLocation.getDeputyName())
                .phoneNumber(sellerLocation.getPhoneNumber())
                .province(sellerLocation.getProvince())
                .district(sellerLocation.getDistrict())
                .ward(sellerLocation.getWard())
                .address(sellerLocation.getAddress())
                .isDefaultAddress(sellerLocation.isDefaultAddress())
                .build();
    }

    @Override
    public List<SellerLocation> convertListRequestToListEntity(List<SellerLocationRequestDTO> locations) {
        return locations.stream().map(this::convertRequestToEntity).collect(Collectors.toList());
    }

    @Override
    public List<SellerLocationResponseDTO> convertEntityListToResponse(List<SellerLocation> locations) {
        return locations.stream().map(this::convertEntityToResponse).collect(Collectors.toList());
    }

    @Override
    public List<HomeSellerLocationsDTO> convertEntityListToHomeResponseList(List<SellerLocation> locations) {
        return locations.stream().map(this::convertEntityToHomeResponse).collect(Collectors.toList());
    }

    @Override
    public HomeSellerLocationsDTO convertEntityToHomeResponse(SellerLocation sellerLocation) {
        return HomeSellerLocationsDTO.builder()
                .province(sellerLocation.getProvince())
                .isDefaultAddress(sellerLocation.isDefaultAddress())
                .id(sellerLocation.getId().toString())
                .build();
    }
}
