package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.payload.request.ListShippingFeeRequestDTO;
import com.cogy_ecommerce_service.payload.request.OrderRequestDto;
import com.cogy_ecommerce_service.payload.request.PostOrderRequestDTO;
import com.cogy_ecommerce_service.payload.response.ListGHTKShippingFeeDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListOrderUserResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderHistoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderListBoResponseDTO;

import java.util.List;

public interface OrderService {

    List<OrderHistoryResponseDTO> save(OrderRequestDto orderRequestDto);

    OrderListBoResponseDTO findBySellerIdAndStatus(String id, String status);

    OrderBoResponseDTO postOrderToDeliveryService(String id, PostOrderRequestDTO requestDTO);

    List<OrderRequestDto> groupOrderBySeller(OrderRequestDto orderRequestDto);

    ListGHTKShippingFeeDetailResponseDTO getShippingFee(ListShippingFeeRequestDTO requestDTO);

    ListOrderUserResponseDTO findByUserIdAndStatus(String id, String status);
}
