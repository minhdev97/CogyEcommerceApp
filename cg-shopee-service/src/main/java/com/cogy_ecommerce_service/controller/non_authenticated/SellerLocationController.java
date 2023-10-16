package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.payload.response.HomeSellerLocationsDTO;
import com.cogy_ecommerce_service.service.SellerLocationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller-location")
@CrossOrigin("*")
public class SellerLocationController {
    private final SellerLocationsService sellerLocationsService;
    @GetMapping()
    public ResponseEntity<?> findAllSellerLocation() {
        List<HomeSellerLocationsDTO> provinces = sellerLocationsService.findByDefaultTrue();
        return new ResponseEntity<>(provinces, HttpStatus.OK);
    }
}
