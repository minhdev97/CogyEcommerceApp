package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.payload.response.CartResponseDTO;
import com.cogy_ecommerce_service.service.CartService;
import com.cogy_ecommerce_service.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mails")
@RequiredArgsConstructor
public class MailController {
    private final ClientService clientService;
    private final CartService cartService;


    @PostMapping("/{id}")
    public ResponseEntity<Boolean> create(@PathVariable String id) {
        CartResponseDTO orderInfo = cartService.findById(id);
        boolean result = clientService.create(orderInfo);
        return ResponseEntity.ok(result);
    }
}
