package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.ColorConverter;
import com.cogy_ecommerce_service.converter.SizeConverter;
import com.cogy_ecommerce_service.converter.VariantConverter;
import com.cogy_ecommerce_service.entity.Variant;
import com.cogy_ecommerce_service.payload.request.SimpleVariantRequestDTO;
import com.cogy_ecommerce_service.payload.request.VariantRequestDTO;
import com.cogy_ecommerce_service.payload.response.ManagementVariantResponseDTO;
import com.cogy_ecommerce_service.payload.response.VariantDetailResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class VariantConverterImpl implements VariantConverter {

    private final SizeConverter sizeConverter;

    private final ColorConverter colorConverter;


    @Override
    public ManagementVariantResponseDTO convertEntityToResponse(Variant variant) {
        return ManagementVariantResponseDTO.builder()
                .id(variant.getId().toString())
                .size(sizeConverter.convertEntityToResponse(variant.getSize()))
                .color(colorConverter.convertEntityToResponse(variant.getColor()))
                .importPrice(variant.getImportPrice())
                .salePrice(variant.getSalePrice())
                .stock(variant.getStock())
                .weight(variant.getWeight())
                .isShown(variant.isShown())
                .build();
    }


    @Override
    public Variant convertRequestToEntity(VariantRequestDTO requestDTO) {
        return Variant.builder()
                .id(requestDTO.getId() == null || requestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(requestDTO.getId()))
                .color(colorConverter.convertRequestToEntity(requestDTO.getColor()))
                .size(sizeConverter.convertRequestToEntity(requestDTO.getSize()))
                .importPrice(requestDTO.getImportPrice())
                .salePrice(requestDTO.getSalePrice())
                .stock(requestDTO.getStock())
                .isShown(requestDTO.isShown())
                .weight(requestDTO.getWeight())
                .active(true)
                .build();
    }


    @Override
    public List<ManagementVariantResponseDTO> convertListEntityToListDto(List<Variant> variantList) {
        return variantList.stream().map(this::convertEntityToResponse).toList();
    }


    @Override
    public List<Variant> convertListRequestToListEntity(List<VariantRequestDTO> variantList) {
        return variantList.stream().map(this::convertRequestToEntity).toList();
    }

    @Override
    public VariantDetailResponseDTO convertEntityToVariantResponse(Variant variant) {
        return VariantDetailResponseDTO.builder()
                .id(variant.getId().toString())
                .size(variant.getSize().getName())
                .color(variant.getColor().getName())
                .salePrice(variant.getSalePrice())
                .stock(variant.getStock())
                .discountPrice(variant.getDiscountPrice())
                .build();
    }

    @Override
    public List<VariantDetailResponseDTO> convertListEntityToListVariantDto(List<Variant> variantList) {
        return variantList.stream().map(this::convertEntityToVariantResponse).toList();
    }

    @Override
    public Variant convertSimpleRequestToEntity(SimpleVariantRequestDTO variantRequestDTO) {
        return Variant.builder()
                .id(variantRequestDTO.getId() == null || variantRequestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(variantRequestDTO.getId()))
                .build();
    }

}
