package com.cogy_ecommerce_service.controller.authenticated;

import com.cogy_ecommerce_service.payload.request.ListShippingFeeRequestDTO;
import com.cogy_ecommerce_service.payload.request.OrderRequestDto;
import com.cogy_ecommerce_service.payload.request.PostOrderRequestDTO;
import com.cogy_ecommerce_service.payload.request.ShippingFeeRequestDTO;
import com.cogy_ecommerce_service.payload.response.GHTKShippingFeeDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListGHTKShippingFeeDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListOrderUserResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderListBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderHistoryResponseDTO;
import com.cogy_ecommerce_service.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;


@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/orders")
    public ResponseEntity<?> saveOrder(@Valid @RequestBody OrderRequestDto orderRequestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        List<OrderHistoryResponseDTO> orderHistoryResponseDTOList = orderService.save(orderRequestDto);
        return new ResponseEntity<>(orderHistoryResponseDTOList, HttpStatus.OK);
    }


    @GetMapping("/sellers/{id}/orders")
    public ResponseEntity<?> getOrdersBySeller(
            @PathVariable String id,
            @RequestParam(required = false) String status
    ) {
        OrderListBoResponseDTO responseDTO = orderService.findBySellerIdAndStatus(id, status);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }


    @PutMapping("/sellers/{id}/orders")
    public ResponseEntity<?> postOrderToDeliveryService(
            @PathVariable String id,
            @RequestBody PostOrderRequestDTO requestDTO
    ) {
        OrderBoResponseDTO responseDTO = orderService.postOrderToDeliveryService(id, requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PostMapping("/shipping-fee")
    public ResponseEntity<?> getShippingFee(@Valid @RequestBody ListShippingFeeRequestDTO requestDTO) {
        ListGHTKShippingFeeDetailResponseDTO responseDTO = orderService.getShippingFee(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @GetMapping("/users/{id}/orders")
    public ResponseEntity<?> getOrdersByUser(
            @PathVariable String id,
            @RequestParam(required = false) String status
    ) {
        ListOrderUserResponseDTO responseDTO = orderService.findByUserIdAndStatus(id, status);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

}
