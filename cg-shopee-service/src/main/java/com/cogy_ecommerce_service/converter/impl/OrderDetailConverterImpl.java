package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.OrderDetailConverter;
import com.cogy_ecommerce_service.entity.OrderDetail;
import com.cogy_ecommerce_service.payload.request.OrderDetailRequestDto;
import com.cogy_ecommerce_service.payload.request.ProductToGHTKRequestDTO;
import com.cogy_ecommerce_service.payload.response.OrderDetailBoResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderDetailResponseDTO;
import com.cogy_ecommerce_service.repository.VariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class OrderDetailConverterImpl implements OrderDetailConverter {

    private final VariantRepository variantRepository;

    @Override
    public List<OrderDetailBoResponseDTO> convertListEntityToListBoResponse(Collection<OrderDetail> orderDetails) {
        return orderDetails.stream().map(this::convertEntityToBoResponse).toList();
    }

    @Override
    public OrderDetailBoResponseDTO convertEntityToBoResponse(OrderDetail orderDetail) {
        return OrderDetailBoResponseDTO
                .builder()
                .color(orderDetail.getVariant().getColor().getName())
                .size(orderDetail.getVariant().getSize().getName())
                .productName(orderDetail.getVariant().getProduct().getName())
                .image(orderDetail.getVariant().getProduct().getImage())
                .quantity(orderDetail.getQuantity())
                .build();
    }

    @Override
    public List<OrderDetail> convertListRequestToListEntity(List<OrderDetailRequestDto> orderDetailRequestDtoList) {
        return orderDetailRequestDtoList.stream().map(this::convertRequestToEntity).toList();
    }

    @Override
    public OrderDetail convertRequestToEntity(OrderDetailRequestDto orderDetailRequestDto) {
        return OrderDetail.builder()
                .id(UUID.randomUUID())
                .quantity(orderDetailRequestDto.getQuantity())
                .variant(variantRepository.findById(UUID.fromString(orderDetailRequestDto.getVariantID())).orElse(null))
                .build();
    }

    @Override
    public List<ProductToGHTKRequestDTO> convertListEntityToListGHTKRequestDTO(Collection<OrderDetail> orderDetails) {
        return orderDetails.stream().map(this::convertEntityToGHTKRequestDTO).toList();
    }

    @Override
    public ProductToGHTKRequestDTO convertEntityToGHTKRequestDTO(OrderDetail orderDetail) {
        return ProductToGHTKRequestDTO
                .builder()
                .name(orderDetail.getVariant().getProduct().getName())
                .price(orderDetail.getVariant().getSalePrice().intValue())
                .product_code(orderDetail.getVariant().getId().toString())
                .weight(orderDetail.getVariant().getWeight().doubleValue())
                .build();
    }


    @Override
    public List<OrderDetailResponseDTO> convertListEntityToListHistoryResponse(Collection<OrderDetail> orderDetails) {
        return orderDetails.stream().map(this::convertEntityToHistoryResponse).toList();
    }


    @Override
    public OrderDetailResponseDTO convertEntityToHistoryResponse(OrderDetail orderDetail) {
        return OrderDetailResponseDTO
                .builder()
                .color(orderDetail.getVariant().getColor().getName())
                .size(orderDetail.getVariant().getSize().getName())
                .productName(orderDetail.getVariant().getProduct().getName())
                .image(orderDetail.getVariant().getProduct().getImage())
                .quantity(orderDetail.getQuantity())
                .build();
    }

}
