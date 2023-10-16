package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.payload.response.CartResponseDTO;
import com.cogy_ecommerce_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/carts")
public class CartController {
    private final CartService cartService;
    @GetMapping("{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        CartResponseDTO cartResponseDTO = cartService.findById(id);
        return new ResponseEntity<>(cartResponseDTO, HttpStatus.OK);
    }
}
