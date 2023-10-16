package com.cogy_ecommerce_service.payload.request;

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
public class GHTKTransportDetailRequestDTO {
    private String pick_address;

    private String pick_ward;

    private String pick_district;

    private String pick_province;

    private String address;

    private String ward;

    private String district;

    private String province;

    private Long weight;

    private String deliver_option;
    //String - Sử dụng phương thức vận chuyển xfast. Nhận 1 trong 2 giá trị xteam/none

}
