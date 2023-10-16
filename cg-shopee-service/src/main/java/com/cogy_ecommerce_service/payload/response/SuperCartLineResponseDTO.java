package com.cogy_ecommerce_service.payload.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SuperCartLineResponseDTO {
    private SellerResponseDTO seller;
    private List<CartLineResponseDTO> cartLines;
}
