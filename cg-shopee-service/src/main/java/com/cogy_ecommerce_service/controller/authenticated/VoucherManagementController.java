package com.cogy_ecommerce_service.controller.authenticated;

import com.cogy_ecommerce_service.payload.request.CreateVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.request.EditVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.response.ProductVoucherResponseDTO;
import com.cogy_ecommerce_service.payload.response.VoucherResponseDTO;
import com.cogy_ecommerce_service.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/sellers/{sellerId}/vouchers")
public class VoucherManagementController {
    private final VoucherService voucherService;

    @GetMapping
    public ResponseEntity<List<VoucherResponseDTO>> findAll(@PathVariable String sellerId) {
        List<VoucherResponseDTO> voucherResponseDTOList = voucherService.findAll(sellerId);
        if (voucherResponseDTOList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(voucherResponseDTOList, HttpStatus.OK);
    }

    @GetMapping("/status/{statusId}")
    public ResponseEntity<List<?>> findAllByStatus(@PathVariable String statusId) {
        List<VoucherResponseDTO> voucherResponseDTOList = voucherService.findAllByStatus(statusId);
        if (voucherResponseDTOList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(voucherResponseDTOList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        VoucherResponseDTO voucherResponseDTO = voucherService.findById(id);
        if (voucherResponseDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(voucherResponseDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateVoucherRequestDTO createVoucherRequestDTO,@PathVariable("sellerId") String sellerId) {
        ProductVoucherResponseDTO voucherResponseDTO = voucherService.create(createVoucherRequestDTO,sellerId);
        if (voucherResponseDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(voucherResponseDTO, HttpStatus.CREATED);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id,
                                                     @RequestBody EditVoucherRequestDTO editVoucherRequestDTO) {
        ProductVoucherResponseDTO voucherResponseDTO = voucherService.edit(id, editVoucherRequestDTO);
        if (voucherResponseDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(voucherResponseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        ProductVoucherResponseDTO voucherResponseDTO = voucherService.delete(id);
        if (voucherResponseDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
