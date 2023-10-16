package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GHTKShippingFeeDetailResponseDTO {
    private int fee;

//    private String shopName;

    private String name;

    private Integer insurance_fee;

    private Integer include_vat;
    private Integer cost_id;
    private String delivery_type;
    private Boolean delivery;

    public GHTKShippingFeeDetailResponseDTO (Integer fee) {
        this.fee = fee;
    }

}
