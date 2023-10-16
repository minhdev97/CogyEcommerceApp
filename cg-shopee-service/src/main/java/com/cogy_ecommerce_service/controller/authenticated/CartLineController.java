package com.cogy_ecommerce_service.controller.authenticated;
import com.cogy_ecommerce_service.payload.request.AddToCartRequestDTO;
import com.cogy_ecommerce_service.payload.request.ListCartLineIdRequestDTO;
import com.cogy_ecommerce_service.payload.response.CartLineResponseDTO;
import com.cogy_ecommerce_service.payload.request.CartLineQuantityRequestDTO;
import com.cogy_ecommerce_service.payload.response.ListStockResponseDTO;
import com.cogy_ecommerce_service.service.CartLineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/cart-lines")
public class CartLineController {

    private final CartLineService cartLineService;
    
    @GetMapping("/{id}")
    public ResponseEntity<?> findCartLineById(@PathVariable String id) {
        CartLineResponseDTO cartLineResponseDTO = cartLineService.findById(id);
        return new ResponseEntity<>(cartLineResponseDTO, HttpStatus.OK);
    }

    @PostMapping("/new-cartline")
    public ResponseEntity<?> saveAddToCart(@RequestBody AddToCartRequestDTO addToCartRequestDTO) {
        CartLineResponseDTO savedCartLine = cartLineService.saveAddToCart(addToCartRequestDTO);
        return new ResponseEntity<>(savedCartLine, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        cartLineService.remove(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateCartLine(@PathVariable String id, @RequestBody CartLineQuantityRequestDTO updatedQuantity) {
        CartLineResponseDTO updatedCartLine = cartLineService.update(id, updatedQuantity);
        return new ResponseEntity<>(updatedCartLine, HttpStatus.OK);
    }

    @DeleteMapping("/selected/{cartLineIds}")
    public ResponseEntity<?> deleteSelectedCartLines(@PathVariable List<String> cartLineIds) {
        cartLineService.removeSelected(cartLineIds);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkoutCartLines(@RequestBody ListCartLineIdRequestDTO requestDTO) {
        try {
            cartLineService.reduceStock(requestDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error during checkout: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/stock/{cartLineIds}")
    public ResponseEntity<?> getListStockOfVariantByCartLineIds(@PathVariable List<String> cartLineIds) {
        ListStockResponseDTO responseDTO = cartLineService.getListStockOfVariantByCartLineIds(cartLineIds);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
}
