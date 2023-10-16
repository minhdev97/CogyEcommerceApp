package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.UserLocation;
import com.cogy_ecommerce_service.payload.request.UserLocationRequestDTO;
import com.cogy_ecommerce_service.payload.response.UserLocationResponseDTO;

import java.util.Collection;
import java.util.List;

public interface UserLocationConverter {
    List<UserLocation> convertListRequestToListEntity(List<UserLocationRequestDTO> locations);

    List<UserLocationResponseDTO> convertListEntityToListResponse(Collection<UserLocation> userLocations);

    UserLocationResponseDTO convertEntityToResponse(UserLocation userLocation);

    UserLocation convertRequestToEntity(UserLocationRequestDTO requestDTO);

}
