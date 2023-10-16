package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ListOrderUserResponseDTO {
    List<OrderUserResponseDTO> orderList;
}
