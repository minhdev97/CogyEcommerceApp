package com.cogy_ecommerce_service.payload.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoucherResponseDTO {
    private String id;

    private String namePromotion;

    private String code;

    private Long value;

    private String type;

    private LocalDateTime timeCreate;

    private LocalDateTime timeStart;

    private LocalDateTime timeEnd;

    private Integer maxUsed;

    private Long requirement;

    private String statusName;

}