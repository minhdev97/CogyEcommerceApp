package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.SellerLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface SellerLocationRepository extends JpaRepository<SellerLocation, UUID> {
    SellerLocation findSellerDefaultAddressBySellerId(UUID id);

    @Query("select s from  SellerLocation s where s.isDefaultAddress = true ")
    List<SellerLocation> findByDefaultAddressTrue();

}
