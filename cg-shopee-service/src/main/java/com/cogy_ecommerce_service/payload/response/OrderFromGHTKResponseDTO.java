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
public class OrderFromGHTKResponseDTO {
    private String partner_id;
    //String - Mã đơn hàng thuộc hệ thống của đối tác

    private String label;
    //Mã vận đơn của GHTK

    private Integer fee;

    private String estimated_pick_time;

    private String estimated_deliver_time;

    private Integer status_id;
}
