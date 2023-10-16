package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Size;
import com.cogy_ecommerce_service.payload.request.SizeRequestDTO;
import com.cogy_ecommerce_service.payload.response.SizeResponseDTO;

import javax.validation.constraints.NotNull;

public interface SizeConverter {

    SizeResponseDTO convertEntityToResponse(Size size);

    Size convertRequestToEntity(SizeRequestDTO size);

}
