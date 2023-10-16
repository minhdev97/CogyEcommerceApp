package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SizeResponseDTO {
    private String id;

    private String name;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s", getId(), getName());
    }
}
