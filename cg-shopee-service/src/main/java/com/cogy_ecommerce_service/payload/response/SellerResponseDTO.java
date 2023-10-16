package com.cogy_ecommerce_service.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;
@Getter
@Setter
@Builder
public class SellerResponseDTO {

    private UUID id;

    private String name;

    private String image;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true; // Cùng một tham chiếu đến đối tượng, trả về true
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false; // obj là null hoặc không cùng kiểu dữ liệu, trả về false
        }
        SellerResponseDTO otherSeller = (SellerResponseDTO) obj; // Ép kiểu obj về kiểu SellerResponseDTO
        return this.id.equals(otherSeller.id); // So sánh giá trị của thuộc tính id

    }
}
