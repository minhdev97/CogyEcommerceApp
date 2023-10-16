package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Photo;
import com.cogy_ecommerce_service.payload.request.PhotoRequestDTO;
import com.cogy_ecommerce_service.payload.response.PhotoResponseDTO;
import com.cogy_ecommerce_service.payload.response.PhotoUrlResponseDTO;

import java.util.List;

public interface PhotoConverter {

    PhotoResponseDTO convertEntityToResponse(Photo photo);

    Photo convertRequestToEntity(PhotoRequestDTO photoResponseDTO);

    List<PhotoResponseDTO> convertListEntityToListDTO(List<Photo> collection);

    List<Photo> convertListRequestToListEntity(List<PhotoRequestDTO> collection);

    PhotoUrlResponseDTO convertEntityToUrlResponse(Photo photo);

    List<PhotoUrlResponseDTO> convertListEntityToListUrlDTO(List<Photo> photos);
}
