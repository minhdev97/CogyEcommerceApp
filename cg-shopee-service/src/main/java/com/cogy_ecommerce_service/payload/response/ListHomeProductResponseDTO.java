package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListHomeProductResponseDTO {
    private List<HomeProductResponseDTO> listData;
}
