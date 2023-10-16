package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.payload.response.SizeResponseDTO;

import java.util.List;

public interface SizeService {

    List<SizeResponseDTO> findByActiveTrue();

}
