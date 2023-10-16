package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.entity.Variant;
import com.cogy_ecommerce_service.repository.VariantRepository;
import com.cogy_ecommerce_service.service.VariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VariantServiceImpl implements VariantService {

    private final VariantRepository variantRepository;


    @Override
    public Variant findById(String id) {
        return variantRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new);
    }


}
