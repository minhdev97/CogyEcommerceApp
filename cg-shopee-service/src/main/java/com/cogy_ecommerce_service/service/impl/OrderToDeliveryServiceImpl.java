package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.payload.request.GHTKTransportDetailRequestDTO;
import com.cogy_ecommerce_service.payload.request.OrderToGHTKRequestDTO;
import com.cogy_ecommerce_service.payload.response.GHTKResponseDTO;
import com.cogy_ecommerce_service.payload.response.GHTKShippingFeeDetailResponseDTO;
import com.cogy_ecommerce_service.payload.response.GHTKShippingFeeResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderFromGHTKResponseDTO;
import com.cogy_ecommerce_service.service.OrderToDeliveryService;
import com.cogy_ecommerce_service.utils.GHTKServiceUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;


@Service
@RequiredArgsConstructor
public class OrderToDeliveryServiceImpl implements OrderToDeliveryService {

    private final GHTKServiceUtils ghtkServiceUtils;

    @Override
    public OrderFromGHTKResponseDTO postOrderToGHTKDeliveryService(OrderToGHTKRequestDTO orderToGHTKRequestDTO) {
        final String POST_URL = "/services/shipment/order/?ver=1.5";
        GHTKResponseDTO response = (GHTKResponseDTO) ghtkServiceUtils.callApiToGHTKDeliveryService(
                POST_URL,
                HttpMethod.POST,
                orderToGHTKRequestDTO,
                GHTKResponseDTO.class
        );
        assert response != null;
        if (response.getSuccess()) {
            return response.getOrder();
        } else {
            return null;
        }
    }

    @Override
    public GHTKShippingFeeDetailResponseDTO getShippingFeeByGHTKDeliveryService(GHTKTransportDetailRequestDTO requestDTO) {
        final String SHIPPING_FEE_URL = "/services/shipment/fee";
        UriComponentsBuilder componentsBuilder = UriComponentsBuilder.fromUriString(SHIPPING_FEE_URL)
                .queryParam("pick_address", requestDTO.getPick_address())
                .queryParam("pick_ward", requestDTO.getPick_ward())
                .queryParam("pick_district", requestDTO.getPick_district())
                .queryParam("pick_province", requestDTO.getPick_province())
                .queryParam("address", requestDTO.getAddress())
                .queryParam("ward", requestDTO.getWard())
                .queryParam("district", requestDTO.getDistrict())
                .queryParam("province", requestDTO.getProvince())
                .queryParam("weight", requestDTO.getWeight())
                .queryParam("deliver_option", requestDTO.getDeliver_option());
        final String URL =  componentsBuilder.encode().toUriString();
        GHTKShippingFeeResponseDTO responseDTO = (GHTKShippingFeeResponseDTO) ghtkServiceUtils.callApiToGHTKDeliveryService(
                URL,
                HttpMethod.GET,
                null,
                GHTKShippingFeeResponseDTO.class
        );
        assert responseDTO != null;
        if (responseDTO.getSuccess()) {
            return responseDTO.getFee();
        } else {
            return null;
        }
    }

}
