package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Voucher;
import com.cogy_ecommerce_service.payload.request.CreateVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.request.EditVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.response.VoucherProductDetailDTO;
import com.cogy_ecommerce_service.payload.response.VoucherResponseDTO;

import java.util.List;

public interface VoucherConverter {
    Voucher convertCreateRequestToEntity(CreateVoucherRequestDTO createVoucherRequestDTO);

    Voucher convertEditRequestToEntity(EditVoucherRequestDTO editVoucherRequestDTO);

    VoucherResponseDTO convertEntityToDTO(Voucher voucher);
    List<VoucherResponseDTO> convertListEntityToListDTO(List<Voucher> voucherList);

    VoucherProductDetailDTO convertEntityToVoucherProductDetail (Voucher voucher);

    List<VoucherProductDetailDTO> convertListEntityToListVoucherProductDetail(List<Voucher> vouchers);
}
