package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.OrderDetail;
import com.cogy_ecommerce_service.payload.request.OrderDetailRequestDto;
import com.cogy_ecommerce_service.payload.request.ProductToGHTKRequestDTO;
import com.cogy_ecommerce_service.payload.response.OrderDetailBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderDetailResponseDTO;

import java.util.Collection;
import java.util.List;

public interface OrderDetailConverter {
    List<OrderDetailBoResponseDTO> convertListEntityToListBoResponse(Collection<OrderDetail> orderDetails);

    OrderDetailBoResponseDTO convertEntityToBoResponse(OrderDetail orderDetail);

    List<OrderDetail> convertListRequestToListEntity(List<OrderDetailRequestDto> orderDetailRequestDtoList);

    OrderDetail convertRequestToEntity(OrderDetailRequestDto orderDetailRequestDto);

    List<ProductToGHTKRequestDTO> convertListEntityToListGHTKRequestDTO(Collection<OrderDetail> orderDetails);

    ProductToGHTKRequestDTO convertEntityToGHTKRequestDTO(OrderDetail orderDetail);

    List<OrderDetailResponseDTO> convertListEntityToListHistoryResponse(Collection<OrderDetail> orderDetails);

    OrderDetailResponseDTO convertEntityToHistoryResponse(OrderDetail orderDetail);

}
