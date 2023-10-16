package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.configuration.EnvVariable;
import com.cogy_ecommerce_service.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShipmentServiceImpl implements ShipmentService {

    private final RabbitTemplate rabbitTemplate;

    private static final String cogyExchange = EnvVariable.RABBITMQ_EXCHANGE;

    private static final String shipmentRoutingKey = EnvVariable.RABBITMQ_QUEUE_SHIPMENT_KEY;


    @Override
    public void sendMessage(String message) {
        rabbitTemplate.convertAndSend(cogyExchange, shipmentRoutingKey, message);
    }

}
