package com.cogy_ecommerce_service.configuration;

import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfiguration {

    private static final String rabbitMqHost = EnvVariable.RABBITMQ_HOST;

    private static final int rabbitMqPort = EnvVariable.RABBITMQ_PORT;

    private static final String rabbitMqUsername = EnvVariable.RABBITMQ_USERNAME;

    private static final String rabbitMqPassword = EnvVariable.RABBITMQ_PASSWORD;

    private static final String cogyExchange = EnvVariable.RABBITMQ_EXCHANGE;

    private static final String shipmentRoutingKey = EnvVariable.RABBITMQ_QUEUE_SHIPMENT_KEY;


    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(rabbitMqHost);
        connectionFactory.setPort(rabbitMqPort);
        connectionFactory.setUsername(rabbitMqUsername);
        connectionFactory.setPassword(rabbitMqPassword);
        return connectionFactory;
    }


    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setExchange(cogyExchange);
        rabbitTemplate.setRoutingKey(shipmentRoutingKey);
        rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter()); // Sử dụng JSON converter
        return rabbitTemplate;
    }

}
