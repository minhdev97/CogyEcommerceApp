package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.entity.SellerLocation;
import com.cogy_ecommerce_service.payload.response.HomeSellerLocationsDTO;

import java.util.List;

public interface SellerLocationsService {
    List<HomeSellerLocationsDTO> findByDefaultTrue();
}
