package com.cogy_ecommerce_service.payload.request;

import java.time.LocalDateTime;
import java.util.List;

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
public class EditVoucherRequestDTO {
    private String id;

    private String namePromotion;

    private String code;

    private Long value;

    private String type;

    private LocalDateTime timeStart;

    private LocalDateTime timeEnd;

    private Integer maxUsed;

    private Long requirement;

    private List<String> productIdList;
}
