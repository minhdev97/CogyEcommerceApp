package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.ProductConverter;
import com.cogy_ecommerce_service.converter.VoucherConverter;
import com.cogy_ecommerce_service.entity.Product;
import com.cogy_ecommerce_service.entity.Seller;
import com.cogy_ecommerce_service.entity.Status;
import com.cogy_ecommerce_service.entity.Voucher;
import com.cogy_ecommerce_service.payload.request.CreateVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.request.EditVoucherRequestDTO;
import com.cogy_ecommerce_service.payload.response.ProductVoucherResponseDTO;
import com.cogy_ecommerce_service.payload.response.VoucherResponseDTO;
import com.cogy_ecommerce_service.repository.ProductRepository;
import com.cogy_ecommerce_service.repository.StatusRepository;
import com.cogy_ecommerce_service.repository.VoucherRepository;
import com.cogy_ecommerce_service.service.ProductService;
import com.cogy_ecommerce_service.service.SellerService;
import com.cogy_ecommerce_service.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoucherServiceImpl implements VoucherService {
    private final VoucherRepository voucherRepository;

    private final ProductRepository productRepository;

    private final StatusRepository statusRepository;

    private final VoucherConverter voucherConverter;

    private final ProductConverter productConverter;

    private final SellerService sellerService;

    private final ProductService productService;

    //front-end
    @Override
    public List<VoucherResponseDTO> findVouchersIsActive() {
        Status status = statusRepository.findByNameEqualsIgnoreCase("ACTIVE");
        return voucherConverter.convertListEntityToListDTO(voucherRepository.findByStatus(status).stream().toList());
    }

    @Override
    public VoucherResponseDTO findByIdAndActive(String id) {
        Status status = statusRepository.findByNameEqualsIgnoreCase("ACTIVE");
        Voucher voucher = voucherRepository.findByIdAndStatus(UUID.fromString(id), status);
        if(voucher != null) {
            return voucherConverter.convertEntityToDTO(voucher);
        } else return null;
    }


    //back-office
    @Override
    public List<VoucherResponseDTO> findAll(String sellerId) {
        Seller seller = sellerService.getCurrentSeller();
        if (!seller.getId().equals(UUID.fromString(sellerId))) throw new IllegalArgumentException();
        List<Voucher> vouchers = voucherRepository.findBySellerId(UUID.fromString(sellerId));
        applyVoucherDiscount(vouchers);
        return voucherConverter.convertListEntityToListDTO(vouchers.stream().toList());
    }


    private void applyVoucherDiscount(List<Voucher> vouchers) {
        LocalDateTime currentTime = LocalDateTime.now();
        for (Voucher voucher : vouchers) {
            productService.checkCurrentTimeAndSetDiscountPrice(voucher, currentTime);
            if (voucher.getStatus() == Voucher.Status.ACTIVE) {
                if (voucher.getType().equals("MONEY")) {
                    voucher.getProducts().forEach(product -> product.getVariants().forEach(variant -> variant.setDiscountPrice(variant.getSalePrice() - voucher.getValue())));
                } else {
                    voucher.getProducts().forEach(product -> product.getVariants().forEach(variant -> variant.setDiscountPrice(variant.getSalePrice() * (100 - voucher.getValue()) / 100)));
                }
            } else {
                voucher.getProducts().forEach(product -> product.getVariants().forEach(variant -> variant.setDiscountPrice(null)));
            }
        }
    }
    @Override
    public List<VoucherResponseDTO> findAllByStatus(String statusId) {
        Status status = statusRepository.findById(UUID.fromString(statusId)).orElse(null);
        return voucherConverter.convertListEntityToListDTO(voucherRepository.findByStatus(status).stream().toList());
    }

    @Override
    public VoucherResponseDTO findById(String id) {
        return voucherConverter.convertEntityToDTO(voucherRepository.findById(UUID.fromString(id)).orElse(null));
    }

    @Override
    public ProductVoucherResponseDTO create(CreateVoucherRequestDTO createVoucherRequestDTO,String sellerId) {
        Seller seller = sellerService.getCurrentSeller();
        if (!seller.getId().equals(UUID.fromString(sellerId))) throw new IllegalArgumentException();
        Voucher voucher = voucherConverter.convertCreateRequestToEntity(createVoucherRequestDTO);
        List<UUID> productIds = createVoucherRequestDTO.getProductIdList().stream().map(UUID::fromString).toList();
        List<Product> products = productRepository.findAllById(productIds);
//        for (String productId : createVoucherRequestDTO.getProductIdList()) {
//            Product product = productRepository.findById(UUID.fromString(productId)).orElse(null);
//            if (product != null) {
//                products.add(product);
//            } else {
//                return null;
//            }
//        }
        voucher.setProducts(products);
        voucher.setStatus(Voucher.Status.PENDING);
        voucher.setTimeCreate(LocalDateTime.now());
        voucher.setSeller(seller);
        voucherRepository.save(voucher);
        return productConverter.convertEntityToProductVoucherResponse(voucherConverter.convertEntityToDTO(voucher),
                productConverter.convertListEntityToListInfoResponse(voucher.getProducts().stream().toList())
                );
    }


    @Override
    public ProductVoucherResponseDTO edit(String id, EditVoucherRequestDTO editVoucherRequestDTO) {
        Voucher voucher = voucherRepository.findById(UUID.fromString(id))
                .orElseThrow(IllegalArgumentException::new);
        if(voucher == null) {
            return null;
        } else {
            voucher.setNamePromotion(editVoucherRequestDTO.getNamePromotion());
            voucher.setCode(editVoucherRequestDTO.getCode());
            voucher.setValue(editVoucherRequestDTO.getValue());
            voucher.setCode(editVoucherRequestDTO.getCode());
            voucher.setTimeStart(editVoucherRequestDTO.getTimeStart());
            voucher.setTimeEnd(editVoucherRequestDTO.getTimeEnd());
            voucher.setMaxUsed(voucher.getMaxUsed());
            voucher.setRequirement(voucher.getRequirement());
            List<Product> products = new ArrayList<>();
            for (String productId : editVoucherRequestDTO.getProductIdList()) {
                Product product = productRepository.findById(UUID.fromString(productId))
                        .orElseThrow(IllegalArgumentException::new);
                products.add(product);
            }
            voucher.setProducts(products);
            voucherRepository.save(voucher);
            return productConverter.convertEntityToProductVoucherResponse(voucherConverter.convertEntityToDTO(voucher), productConverter.convertListEntityToListInfoResponse(voucher.getProducts().stream().toList())
            );
        }
    }

    @Override
    public ProductVoucherResponseDTO delete(String id) {
        Voucher voucher = voucherRepository.findById(UUID.fromString(id))
                .orElseThrow(IllegalArgumentException::new);
        assert voucher != null;
        voucher.setStatus(Voucher.Status.DISABLED);
        voucher.getProducts().forEach(product -> product.getVariants().forEach(variant -> variant.setDiscountPrice(null)));
        voucherRepository.save(voucher);
        return productConverter.convertEntityToProductVoucherResponse(voucherConverter.convertEntityToDTO(voucher),
                productConverter.convertListEntityToListInfoResponse(voucher.getProducts().stream().toList())
        );
    }
}
