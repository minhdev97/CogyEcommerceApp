package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shipment")
@CrossOrigin("*")
public class ShipmentController {
    private final ShipmentService shipmentService;

    @PostMapping
    public ResponseEntity<?> sendMessageToShipment(@RequestBody String message) {
        shipmentService.sendMessage(message);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
