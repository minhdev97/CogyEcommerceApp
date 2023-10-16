package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.SellerLocationConverter;
import com.cogy_ecommerce_service.payload.response.HomeSellerLocationsDTO;
import com.cogy_ecommerce_service.repository.SellerLocationRepository;
import com.cogy_ecommerce_service.service.SellerLocationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SellerLocationsServiceImpl implements SellerLocationsService {

    private final SellerLocationRepository sellerLocationRepository;
    private final SellerLocationConverter sellerLocationConverter;
    @Override
    public List<HomeSellerLocationsDTO> findByDefaultTrue() {
        return sellerLocationConverter.convertEntityListToHomeResponseList(sellerLocationRepository.findByDefaultAddressTrue());
    }
}
