package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Order;
import com.cogy_ecommerce_service.payload.request.OrderRequestDto;
import com.cogy_ecommerce_service.payload.request.SimpleOrderRequestDTO;
import com.cogy_ecommerce_service.payload.response.OrderBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderHistoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderUserResponseDTO;

import java.util.List;

public interface OrderConverter {
    List<OrderBoResponseDTO> convertListEntityToListBoResponse(List<Order> orderList);

    OrderBoResponseDTO convertEntityToBoResponse(Order order);

    Order convertRequestToEntity(OrderRequestDto orderRequestDto);

    Order convertSimpleRequestToEntity(SimpleOrderRequestDTO simpleOrderRequestDTO);

    OrderHistoryResponseDTO convertEntityToHistoryOrderResponse(Order order);

    List<OrderUserResponseDTO> convertListEntityToListOrderUserResponse(List<Order> orderList);

    OrderUserResponseDTO convertEntityToOrderUserResponse(Order order);
}
