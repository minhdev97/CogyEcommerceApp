package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.PhotoConverter;
import com.cogy_ecommerce_service.entity.Photo;
import com.cogy_ecommerce_service.payload.request.PhotoRequestDTO;
import com.cogy_ecommerce_service.payload.response.PhotoResponseDTO;
import com.cogy_ecommerce_service.payload.response.PhotoUrlResponseDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class PhotoConverterImpl implements PhotoConverter {

    @Override
    public PhotoResponseDTO convertEntityToResponse(Photo photo) {
        return PhotoResponseDTO.builder()
                .id(photo.getId().toString())
                .url(photo.getUrl())
                .build();
    }


    @Override
    public Photo convertRequestToEntity(PhotoRequestDTO photoRequestDTO) {
        return Photo.builder()
                .id(photoRequestDTO.getId() == null || photoRequestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(photoRequestDTO.getId()))
                .url(photoRequestDTO.getUrl())
                .build();
    }


    @Override
    public List<PhotoResponseDTO> convertListEntityToListDTO(List<Photo> photos) {
        return photos.stream()
                .map(this::convertEntityToResponse)
                .collect(Collectors.toList());
    }


    @Override
    public List<Photo> convertListRequestToListEntity(List<PhotoRequestDTO> requestDTOList) {
        return requestDTOList.stream()
                .map(this::convertRequestToEntity)
                .collect(Collectors.toList());
    }

    @Override
    public PhotoUrlResponseDTO convertEntityToUrlResponse(Photo photo) {
        return PhotoUrlResponseDTO.builder()
                .url(photo.getUrl())
                .build();
    }

    @Override
    public List<PhotoUrlResponseDTO> convertListEntityToListUrlDTO(List<Photo> photos) {
        return photos.stream()
                .map(this::convertEntityToUrlResponse)
                .collect(Collectors.toList());
    }

}
