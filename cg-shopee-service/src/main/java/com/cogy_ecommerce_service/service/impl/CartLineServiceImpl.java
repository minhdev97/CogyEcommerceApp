package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.CartLineConverter;
import com.cogy_ecommerce_service.entity.Cart;
import com.cogy_ecommerce_service.entity.CartLine;
import com.cogy_ecommerce_service.entity.Variant;
import com.cogy_ecommerce_service.payload.request.AddToCartRequestDTO;
import com.cogy_ecommerce_service.payload.request.CartLineQuantityRequestDTO;
import com.cogy_ecommerce_service.payload.request.ListCartLineIdRequestDTO;
import com.cogy_ecommerce_service.payload.response.CartLineResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListStockResponseDTO;
import com.cogy_ecommerce_service.payload.response.StockResponseDTO;
import com.cogy_ecommerce_service.repository.CartLineRepository;
import com.cogy_ecommerce_service.repository.CartRepository;
import com.cogy_ecommerce_service.repository.VariantRepository;
import com.cogy_ecommerce_service.service.CartLineService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class CartLineServiceImpl implements CartLineService {

    private final CartLineRepository cartLineRepository;

    private final CartRepository cartRepository;

    private final VariantRepository variantRepository;

    private final CartLineConverter cartLineConverter;

    public CartLineResponseDTO findById(@NotNull @NotBlank String id) {
        return cartLineConverter.convertCartLineEntityToResponse(cartLineRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new));
    }


    @Override
    public CartLineResponseDTO saveAddToCart(AddToCartRequestDTO addToCartRequestDTO) {
        Cart cart = cartRepository.findById(UUID.fromString(addToCartRequestDTO.getCartId())).orElseThrow(IllegalArgumentException::new);

        Optional<CartLine> optionalCartLine = cart.getCartLines().stream()
                .filter(cl -> cl.getVariant().getId().toString().equals(addToCartRequestDTO.getVariantId()))
                .findFirst();

        CartLine existCartLine = optionalCartLine.orElse(null);

        if(existCartLine == null) {
            CartLine cartLine = cartLineConverter.convertAddToCartRequestToEntity(addToCartRequestDTO);
            cartLine.setCart(cart);
            Variant variant = variantRepository.findById(UUID.fromString(addToCartRequestDTO.getVariantId())).orElseThrow(IllegalArgumentException::new);
            cartLine.setVariant(variant);
            cartLineRepository.save(cartLine);
            return cartLineConverter.convertCartLineEntityToResponse(cartLine);
        } else {
            existCartLine.setQuantity(existCartLine.getQuantity() + addToCartRequestDTO.getQuantity());
            cartLineRepository.save(existCartLine);
            return cartLineConverter.convertCartLineEntityToResponse(existCartLine);
        }

    }


    @Override
    public CartLineResponseDTO update(String id, CartLineQuantityRequestDTO cartLineQuantityRequestDTO) {
        CartLine updateCartLine = cartLineRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new);
        updateCartLine.setQuantity(cartLineQuantityRequestDTO.getQuantity());
        return cartLineConverter.convertCartLineEntityToResponse(updateCartLine);
    }


    @Override
    public void remove(String id) {
        cartLineRepository.deleteById(UUID.fromString(id));
    }

    @Override
    public void removeSelected(List<String> cartLineIds) {
        for (String cartLineId : cartLineIds) {
            cartLineRepository.deleteById(UUID.fromString(cartLineId));
        }
    }

    @Override
    public void reduceStock(ListCartLineIdRequestDTO requestDTO) throws Exception {
        List<CartLine> cartLines = new ArrayList<>();
        for (String id : requestDTO.getCartLineIds()) {
            CartLine cartLine = cartLineRepository.findById(UUID.fromString(id)).orElseThrow(IllegalArgumentException::new);
            cartLines.add(cartLine);
        }

        for (CartLine cartLine : cartLines) {
            Variant variant = cartLine.getVariant();
            int currentStock = variant.getStock();
            int quantityToReduce = cartLine.getQuantity();

            if (currentStock >= quantityToReduce) {
                variant.setStock(currentStock - quantityToReduce);
                variantRepository.save(variant);
            } else {
                throw new Exception("Insufficient stock for some items.");
            }
        }
    }

    @Override
    public ListStockResponseDTO getListStockOfVariantByCartLineIds(List<String> cartLineIds) {
        List<StockResponseDTO> responseDTOList = new ArrayList<>();
        List<UUID> uuidList = cartLineIds.stream().map(UUID::fromString).toList();
        List<CartLine> cartLines = cartLineRepository.findAllById(uuidList);
        for (CartLine cartLine : cartLines) {
            Integer stockOfVariant = cartLine.getVariant().getStock();
            String cartLineId = cartLine.getId().toString();
            StockResponseDTO stockResponseDTO = new StockResponseDTO(stockOfVariant, cartLineId);
            responseDTOList.add(stockResponseDTO);
        }
        return new ListStockResponseDTO(responseDTOList);
    }
}
