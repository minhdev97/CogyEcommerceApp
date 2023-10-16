package com.cogy_ecommerce_service.controller.authenticated;

import com.cogy_ecommerce_service.payload.request.SellerRequestDTO;
import com.cogy_ecommerce_service.payload.response.BooleanResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListSellerLocationResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderListBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.SellerResponseDTO;
import com.cogy_ecommerce_service.service.OrderService;
import com.cogy_ecommerce_service.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api")
public class SellerController {
    private final SellerService sellerService;

    @PostMapping("/users/{userId}/sellers")
    public ResponseEntity<?> create(
            @PathVariable String userId,
            @Valid @RequestBody SellerRequestDTO requestDTO,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        SellerResponseDTO responseDTO = sellerService.create(userId, requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }


    @GetMapping("/sellers/names/{name}")
    public ResponseEntity<?> checkName(@PathVariable String name) {
        BooleanResponseDTO responseDTO = sellerService.isExistName(name);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @GetMapping("/sellers/{id}/seller-locations")
    public ResponseEntity<?> findLocationsBySellerId(@PathVariable String id) {
        ListSellerLocationResponseDTO responseDTO = sellerService.findLocationsBySellerId(id);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }


}
