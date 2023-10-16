package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.payload.response.ColorResponseDTO;

import java.util.List;

public interface ColorService {

    List<ColorResponseDTO> findByActiveTrue();

}
