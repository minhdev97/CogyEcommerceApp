package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.BuyerConverter;
import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.payload.request.BuyerRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class BuyerConverterImpl implements BuyerConverter {

    @Override
    public User convertRequestToEntity(BuyerRequestDTO buyer) {
        return User.builder()
                .id(UUID.fromString(buyer.getId()))
                .build();
    }
}
