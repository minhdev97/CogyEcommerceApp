package com.cogy_ecommerce_service.repository;

import com.cogy_ecommerce_service.entity.Status;
import com.cogy_ecommerce_service.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

public interface VoucherRepository extends JpaRepository<Voucher, UUID> {

    List<Voucher> findByStatus(Status status);

    Voucher findByIdAndStatus(UUID id, Status status);

    @Query("select v from Voucher v join v.products p where p.id = :id and v.status = 'active'")
    List<Voucher> findByProductId(@Param("id") UUID id);

    @Query("select v from Voucher v where v.status = 'active'")
    List<Voucher> findByStatusActive();

    @Query("select v from Voucher v where v.seller.id = :sellerId")
    List<Voucher> findBySellerId(@Param("sellerId") UUID sellerId);
}
