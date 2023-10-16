package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.SellerConverter;
import com.cogy_ecommerce_service.converter.SellerLocationConverter;
import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.entity.SellerLocation;
import com.cogy_ecommerce_service.entity.User;
import com.cogy_ecommerce_service.payload.request.SellerRequestDTO;
import com.cogy_ecommerce_service.payload.response.BooleanResponseDTO;
import com.cogy_ecommerce_service.payload.response.ListSellerLocationResponseDTO;
import com.cogy_ecommerce_service.payload.response.SellerLocationResponseDTO;
import com.cogy_ecommerce_service.payload.response.SellerResponseDTO;
import com.cogy_ecommerce_service.repository.SellerLocationRepository;
import com.cogy_ecommerce_service.repository.SellerRepository;
import com.cogy_ecommerce_service.service.SellerService;
import com.cogy_ecommerce_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final UserService userService;

    private final SellerRepository sellerRepository;

    private final SellerLocationRepository sellerLocationRepository;

    private final SellerConverter sellerConverter;

    private final SellerLocationConverter sellerLocationConverter;


    @Override
    public Seller findById(String sellerId) {
        return sellerRepository.findById(UUID.fromString(sellerId))
                .orElseThrow(IllegalArgumentException::new);
    }


    @Override
    public SellerResponseDTO create(String userId, SellerRequestDTO requestDTO) {
        User user = userService.findById(userId);
        if (user.getSeller() != null) throw new IllegalArgumentException();
        Seller seller = sellerConverter.convertRequestToEntity(requestDTO);
        seller.setUser(user);
        seller.setCreationTime(LocalDateTime.now());
        Seller response = sellerRepository.save(seller);
        Collection<SellerLocation> locations = seller.getLocations();
        checkAndSaveLocations(locations, response);
        return sellerConverter.convertEntityToResponse(response);
    }

    @Override
    public BooleanResponseDTO isExistName(String name) {
        Seller seller = sellerRepository.findByName(name);
        return seller == null
                ? new BooleanResponseDTO(false)
                : new BooleanResponseDTO(true);
    }

    @Override
    public ListSellerLocationResponseDTO findLocationsBySellerId(String id) {
        Seller seller = findById(id);
        List<SellerLocation> sellerLocations = (List<SellerLocation>) seller.getLocations();
        List<SellerLocationResponseDTO> responseDTOList = sellerLocationConverter.convertEntityListToResponse(sellerLocations);
        return new ListSellerLocationResponseDTO(responseDTOList);
    }

    @Override
    public Seller findByName(String shopName) {
        Seller seller = sellerRepository.findByName(shopName);
        if (seller == null) throw new IllegalArgumentException("Shop name not found!");
        return seller;
    }

    @Override
    public Seller getCurrentSeller() {
        User user = userService.getCurrentUser();
        Seller seller = user.getSeller();
        if (seller == null) throw new IllegalArgumentException();
        return seller;
    }

    void checkAndSaveLocations(Collection<SellerLocation> locations, Seller seller) {
        int numberDefaultAddress = 0;
        List<SellerLocation> locationList = new ArrayList<>(locations);
        for (SellerLocation location : locationList) {
            location.setSeller(seller);
            if (location.isDefaultAddress()) {
                ++numberDefaultAddress;
            }
        }
        if (numberDefaultAddress != 1) throw new IllegalArgumentException();
        sellerLocationRepository.saveAll(locationList);
    }


}
