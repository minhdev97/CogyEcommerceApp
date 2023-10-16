package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.payload.request.CreateVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.request.EditVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.response.ProductVoucherResponseDTO;
import com.cogy_ecommerce_service.payload.response.VoucherResponseDTO;

import java.util.List;

public interface VoucherService {
    ProductVoucherResponseDTO create(CreateVoucherRequestDTO createVoucherRequestDTO,String sellerId);
    VoucherResponseDTO findById(String id);
    ProductVoucherResponseDTO edit(String id, EditVoucherRequestDTO editVoucherRequestDTO);

    ProductVoucherResponseDTO delete(String id);

    List<VoucherResponseDTO> findAll(String sellerId);
    List<VoucherResponseDTO> findAllByStatus(String statusId);

    List<VoucherResponseDTO> findVouchersIsActive();

    VoucherResponseDTO findByIdAndActive(String id);
}
