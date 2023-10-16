package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.payload.request.OrderDetailRequestDto;
import com.cogy_ecommerce_service.payload.response.OrderDetailResponseDTO;

public interface OrderDetailService {
    OrderDetailResponseDTO save(OrderDetailRequestDto orderDetailRequestDto);
}
