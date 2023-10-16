package com.cogy_ecommerce_service.payload.request;


import com.cogy_ecommerce_service.entity.Seller;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Future;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateVoucherRequestDTO {

    private String id;

    @NotBlank
    private String namePromotion;

    @NotBlank
    private String code;

    @Min(value = 1, message = "Value must be greater than or equal to 1")
    private Long value;

    @NotBlank
    private String type;

    @NotNull(message = "timeStart must not be null")
    private String timeStart;

    @NotNull(message = "timeStart must not be null")
    private String timeEnd;

    @Min(value = 1, message = "Value must be greater than or equal to 1")
    private Integer maxUsed;

    private Long requirement;

    @NotEmpty(message = "Product ID list must not be empty")
    private List<String> productIdList;

}
