package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.OrderConverter;
import com.cogy_ecommerce_service.converter.OrderDetailConverter;
import com.cogy_ecommerce_service.converter.SellerConverter;
import com.cogy_ecommerce_service.converter.UserConverter;
import com.cogy_ecommerce_service.entity.Order;
import com.cogy_ecommerce_service.payload.request.OrderRequestDto;
import com.cogy_ecommerce_service.payload.request.SimpleOrderRequestDTO;
import com.cogy_ecommerce_service.payload.response.OrderBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderHistoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderUserResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OrderConverterImpl implements OrderConverter {

    private final UserConverter userConverter;

    private final SellerConverter sellerConverter;

    private final OrderDetailConverter orderDetailConverter;

    @Override
    public List<OrderBoResponseDTO> convertListEntityToListBoResponse(List<Order> orderList) {
        return orderList.stream().map(this::convertEntityToBoResponse).toList();
    }

    @Override
    public OrderBoResponseDTO convertEntityToBoResponse(Order order) {
        return OrderBoResponseDTO
                .builder()
                .id(order.getId().toString())
                .buyer(userConverter.convertEntityToBuyerSimpleResponse(order.getBuyer()))
                .deliveryService(order.getDeliveryService().getValue())
                .orderDetails(orderDetailConverter.convertListEntityToListBoResponse(order.getOrderDetails()))
                .status(order.getStatus().name())
                .totalPrice(order.getTotalPrice())
                .cogyOrderCode(order.getCogyOrderCode())
                .deliveryTrackingCode(order.getDeliveryTrackingCode())
                .requestTime(order.getRequestTime())
                .build();
    }

    @Override
    public Order convertRequestToEntity(OrderRequestDto orderRequestDto) {
        return Order.builder()
                .id(UUID.randomUUID())
                .totalPrice(orderRequestDto.getTotalPrice())
                .status(orderRequestDto.getStatus())
                .deliveryService(Order.DeliveryService.valueOf(orderRequestDto.getDeliveryService()))
                .orderDetails(orderDetailConverter.convertListRequestToListEntity(orderRequestDto.getOrderDetailRequestDtoList()))
                .shippingFee(orderRequestDto.getShippingFee())
                .build();
    }

    @Override
    public Order convertSimpleRequestToEntity(SimpleOrderRequestDTO simpleOrderRequestDTO) {
        return Order.builder()
                .id(simpleOrderRequestDTO.getId() == null || simpleOrderRequestDTO.getId().isEmpty()
                        ? UUID.randomUUID()
                        : UUID.fromString(simpleOrderRequestDTO.getId()))
                .build();
    }

    @Override
    public OrderHistoryResponseDTO convertEntityToHistoryOrderResponse(Order order) {
        return OrderHistoryResponseDTO
                .builder()
                .id(order.getId().toString())
                .buyer(userConverter.convertEntityToBuyerSimpleResponse(order.getBuyer()))
                .deliveryService(order.getDeliveryService().getValue())
                .orderDetails(orderDetailConverter.convertListEntityToListHistoryResponse(order.getOrderDetails()))
                .status(order.getStatus().name())
                .totalPrice(order.getTotalPrice())
                .build();
    }

    @Override
    public OrderUserResponseDTO convertEntityToOrderUserResponse(Order order) {
        return OrderUserResponseDTO
                .builder()
                .requestTime(order.getRequestTime())
                .cogyOrderCode(order.getCogyOrderCode())
                .deliveryService(order.getDeliveryService().getValue())
                .id(order.getId().toString())
                .orderDetails(orderDetailConverter.convertListEntityToListBoResponse(order.getOrderDetails()))
                .seller(sellerConverter.convertEntityToResponse(order.getSeller()))
                .status(order.getStatus().name())
                .totalPrice(order.getTotalPrice())
                .deliveryTrackingCode(order.getDeliveryTrackingCode())
                .build();
    }

    @Override
    public List<OrderUserResponseDTO> convertListEntityToListOrderUserResponse(List<Order> orderList) {
        return orderList.stream().map(this::convertEntityToOrderUserResponse).toList();
    }
}
