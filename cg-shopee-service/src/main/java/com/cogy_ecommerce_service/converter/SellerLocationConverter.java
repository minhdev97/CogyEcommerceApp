package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.SellerLocation;
import com.cogy_ecommerce_service.payload.request.SellerLocationRequestDTO;
import com.cogy_ecommerce_service.payload.response.HomeSellerLocationsDTO;
import com.cogy_ecommerce_service.payload.response.SellerLocationResponseDTO;

import java.util.List;

public interface SellerLocationConverter {

    SellerLocation convertRequestToEntity(SellerLocationRequestDTO requestDTO);

    SellerLocationResponseDTO convertEntityToResponse(SellerLocation sellerLocation);

    List<SellerLocation> convertListRequestToListEntity(List<SellerLocationRequestDTO> locations);

    List<SellerLocationResponseDTO> convertEntityListToResponse(List<SellerLocation> locations);

    List<HomeSellerLocationsDTO> convertEntityListToHomeResponseList(List<SellerLocation> locations);
    HomeSellerLocationsDTO convertEntityToHomeResponse(SellerLocation sellerLocation);
}
