package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.OrderDetailConverter;
import com.cogy_ecommerce_service.entity.OrderDetail;
import com.cogy_ecommerce_service.payload.request.OrderDetailRequestDto;
import com.cogy_ecommerce_service.payload.response.OrderDetailResponseDTO;
import com.cogy_ecommerce_service.repository.OrderDetailRepository;
import com.cogy_ecommerce_service.repository.VariantRepository;
import com.cogy_ecommerce_service.service.OrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;

    private final OrderDetailConverter orderDetailConverter;

    private final VariantRepository variantRepository;


    @Override
    public OrderDetailResponseDTO save(OrderDetailRequestDto orderDetailRequestDto) {
        OrderDetail orderDetail =  orderDetailRepository.save(orderDetailConverter.convertRequestToEntity(orderDetailRequestDto));
        orderDetail.setVariant(variantRepository.findById(UUID.fromString(orderDetailRequestDto.getVariantID())).orElse(null));
        return orderDetailConverter.convertEntityToHistoryResponse(orderDetail);
    }

}
