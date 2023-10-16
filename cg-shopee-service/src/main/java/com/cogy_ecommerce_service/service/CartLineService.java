package com.cogy_ecommerce_service.service;


import com.cogy_ecommerce_service.payload.request.AddToCartRequestDTO;
import com.cogy_ecommerce_service.payload.request.CartLineQuantityRequestDTO;
import com.cogy_ecommerce_service.payload.request.ListCartLineIdRequestDTO;
import com.cogy_ecommerce_service.payload.response.CartLineResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListStockResponseDTO;

import java.util.List;

public interface CartLineService {
    CartLineResponseDTO findById(String id);

    CartLineResponseDTO  saveAddToCart(AddToCartRequestDTO addToCartRequestDTO);

    CartLineResponseDTO update(String id, CartLineQuantityRequestDTO cartLineQuantityRequestDTO);

    void remove(String id);

    void removeSelected(List<String> cartLineIds);

    void reduceStock(ListCartLineIdRequestDTO requestDTO) throws Exception;

    ListStockResponseDTO getListStockOfVariantByCartLineIds(List<String> cartLineIds);
}
