package com.cogy_ecommerce_service.payload.request;

import java.util.List;

public class CartLineIdsRequestDTO {
    private List<String> cartLineIds;

    public List<String> getCartLineIds() {
        return cartLineIds;
    }

    public void setCartLineIds(List<String> cartLineIds) {
        this.cartLineIds = cartLineIds;
    }
}
