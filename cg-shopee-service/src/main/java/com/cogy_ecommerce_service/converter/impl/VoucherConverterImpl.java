package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.ProductConverter;
import com.cogy_ecommerce_service.converter.VoucherConverter;
import com.cogy_ecommerce_service.entity.Voucher;
import com.cogy_ecommerce_service.payload.request.CreateVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.request.EditVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.response.VoucherProductDetailDTO;
import com.cogy_ecommerce_service.payload.response.VoucherResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;


@Component
@RequiredArgsConstructor
public class VoucherConverterImpl implements VoucherConverter {
    @Override
    public Voucher convertCreateRequestToEntity(CreateVoucherRequestDTO createVoucherRequestDTO) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        LocalDateTime timeEnd = LocalDateTime.parse(createVoucherRequestDTO.getTimeEnd(), formatter);
        LocalDateTime timeStart = LocalDateTime.parse(createVoucherRequestDTO.getTimeStart(), formatter);
        String localTimeZone = "Asia/Ho_Chi_Minh";
        ZoneId zoneId = ZoneId.of(localTimeZone);
        ZonedDateTime zonedTimeEndDateTime = timeEnd.atZone(ZoneId.of("UTC")).withZoneSameInstant(zoneId);
        ZonedDateTime zonedTimeStartDateTime = timeStart.atZone(ZoneId.of("UTC")).withZoneSameInstant(zoneId);
        return Voucher.builder()
                .id(createVoucherRequestDTO.getId() == null || createVoucherRequestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(createVoucherRequestDTO.getId()))
                .namePromotion(createVoucherRequestDTO.getNamePromotion())
                .code(createVoucherRequestDTO.getCode())
                .value(createVoucherRequestDTO.getValue())
                .type(createVoucherRequestDTO.getType())
                .timeStart(zonedTimeStartDateTime.toLocalDateTime())
                .timeEnd(zonedTimeEndDateTime.toLocalDateTime())
                .maxUsed(createVoucherRequestDTO.getMaxUsed())
                .requirement(createVoucherRequestDTO.getRequirement())
                .build();
    }

    @Override
    public Voucher convertEditRequestToEntity(EditVoucherRequestDTO editVoucherRequestDTO) {
        return Voucher.builder()
                .id(editVoucherRequestDTO.getId() == null || editVoucherRequestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(editVoucherRequestDTO.getId()))
                .namePromotion(editVoucherRequestDTO.getNamePromotion())
                .code(editVoucherRequestDTO.getCode())
                .value(editVoucherRequestDTO.getValue())
                .type(editVoucherRequestDTO.getType())
                .timeStart(editVoucherRequestDTO.getTimeStart())
                .timeEnd(editVoucherRequestDTO.getTimeEnd())
                .maxUsed(editVoucherRequestDTO.getMaxUsed())
                .requirement(editVoucherRequestDTO.getRequirement())
                .build();
    }

    @Override
    public VoucherResponseDTO convertEntityToDTO(Voucher voucher) {
        return VoucherResponseDTO.builder()
                .id(voucher.getId().toString())
                .namePromotion(voucher.getNamePromotion())
                .code(voucher.getCode())
                .value(voucher.getValue())
                .type(voucher.getType())
                .timeCreate(voucher.getTimeCreate())
                .timeStart(voucher.getTimeStart())
                .timeEnd(voucher.getTimeEnd())
                .maxUsed(voucher.getMaxUsed())
                .requirement(voucher.getRequirement())
                .statusName(voucher.getStatus().name())
                .build();
    }

    @Override
    public List<VoucherResponseDTO> convertListEntityToListDTO(List<Voucher> voucherList) {
        return voucherList.stream().map(this::convertEntityToDTO).toList();
    }

    @Override
    public VoucherProductDetailDTO convertEntityToVoucherProductDetail(Voucher voucher) {
        return VoucherProductDetailDTO.builder()
                .id(voucher.getId().toString())
                .value(voucher.getValue())
                .type(voucher.getType())
                .requirement(voucher.getRequirement())
                .code(voucher.getCode())
                .build();
    }

    @Override
    public List<VoucherProductDetailDTO> convertListEntityToListVoucherProductDetail(List<Voucher> vouchers) {
        return vouchers.stream().map(this::convertEntityToVoucherProductDetail).toList();
    }
}
