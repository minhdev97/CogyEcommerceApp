package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.entity.Variant;
import com.cogy_ecommerce_service.payload.response.ManagementVariantResponseDTO;

public interface VariantService {
    Variant findById(String id);

}
