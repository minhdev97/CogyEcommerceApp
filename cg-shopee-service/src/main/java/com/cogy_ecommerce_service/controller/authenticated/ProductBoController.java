package com.cogy_ecommerce_service.controller.authenticated;

import com.cogy_ecommerce_service.payload.request.RequestProductDTO;
import com.cogy_ecommerce_service.payload.response.ManagementProductResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProductToCreateVoucherDTO;
import com.cogy_ecommerce_service.payload.response.ProductToEditResponseDTO;
import com.cogy_ecommerce_service.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/sellers/{sellerId}/products")
public class ProductBoController {

    private final ProductService productService;


    @GetMapping
    public ResponseEntity<?> findBySellerId(@PathVariable String sellerId) {
        List<ManagementProductResponseDTO> products = productService.findBySellerId(sellerId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> findByIdToEdit(@PathVariable String sellerId, @PathVariable String id) {
        ProductToEditResponseDTO productResponseDTO = productService.findByIdToEdit(sellerId, id);
        return productResponseDTO == null
                ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
                : new ResponseEntity<>(productResponseDTO, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<?> create(
            @PathVariable String sellerId,
            @Valid @RequestBody RequestProductDTO requestProductDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        ManagementProductResponseDTO managementProductResponseDTO = productService.create(sellerId, requestProductDTO);
        return new ResponseEntity<>(managementProductResponseDTO, HttpStatus.CREATED);
    }


    @PutMapping
    public ResponseEntity<?> update(
            @PathVariable String sellerId,
            @Valid @RequestBody RequestProductDTO requestProductDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        ManagementProductResponseDTO managementProductResponseDTO = productService.save(sellerId, requestProductDTO);
        return new ResponseEntity<>(managementProductResponseDTO, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String sellerId, @PathVariable String id) {
        productService.setActiveFalse(sellerId, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
