package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Variant;
import com.cogy_ecommerce_service.payload.request.SimpleVariantRequestDTO;
import com.cogy_ecommerce_service.payload.request.VariantRequestDTO;
import com.cogy_ecommerce_service.payload.response.ManagementVariantResponseDTO;
import com.cogy_ecommerce_service.payload.response.VariantDetailResponseDTO;

import java.util.List;

public interface VariantConverter {

    List<ManagementVariantResponseDTO> convertListEntityToListDto(List<Variant> variantList);

    Variant convertRequestToEntity(VariantRequestDTO requestDTO);

    ManagementVariantResponseDTO convertEntityToResponse(Variant variant);

    List<Variant> convertListRequestToListEntity(List<VariantRequestDTO> variantList);


    VariantDetailResponseDTO convertEntityToVariantResponse(Variant variant);

    List<VariantDetailResponseDTO> convertListEntityToListVariantDto(List<Variant> variantList);

    Variant convertSimpleRequestToEntity(SimpleVariantRequestDTO variantRequestDTO);
}
