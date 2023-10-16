package com.cogy_ecommerce_service.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponseDTO<T> {

    private List<T> content;

    private int pageSize;

    private int totalPages;

    private boolean hasNext;

    private boolean hasPrevious;

    private long totalElements;

    private int currentPageNumber;
}
