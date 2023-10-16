package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.payload.response.VoucherResponseDTO;
import com.cogy_ecommerce_service.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/vouchers")
public class VoucherController {
    private final VoucherService voucherService;

    @GetMapping
    public ResponseEntity<List<VoucherResponseDTO>> findVouchersIsActive() {
        List<VoucherResponseDTO> voucherResponseDTOList = voucherService.findVouchersIsActive();
        if (voucherResponseDTOList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(voucherResponseDTOList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VoucherResponseDTO> findById(@PathVariable String id) {
        VoucherResponseDTO voucherResponseDTO = voucherService.findByIdAndActive(id);
        if (voucherResponseDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(voucherResponseDTO, HttpStatus.OK);
    }

//    @GetMapping("/product/{id}")
//    public ResponseEntity<?> findByProductId (@PathVariable String id) {
//        VoucherResponseDTO voucherResponseDTO = voucherService.findByProductId(id);
//        if (voucherResponseDTO == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return new ResponseEntity<>(voucherResponseDTO, HttpStatus.OK);
//    }
}
