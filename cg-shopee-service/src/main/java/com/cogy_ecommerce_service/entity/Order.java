package com.cogy_ecommerce_service.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ORDERS")
public class Order {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "BUYER_ID", referencedColumnName = "ID")
    private User buyer;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "SELLER_ID", referencedColumnName = "ID")
    private Seller seller;

    @PositiveOrZero
    @Column(name = "TOTAL_PRICE")
    private Double totalPrice;

    @PositiveOrZero
    @Column(name = "SHIPPING_FEE")
    private Double shippingFee;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "REQUEST_TIME")
    private LocalDateTime requestTime;

    @Column(name = "CONFIRM_TIME")
    private LocalDateTime confirmTime;

    @Column(name = "PICK_UP_TIME")
    private LocalDateTime pickUpTime;

    @Column(name = "COMPLETE_TIME")
    private LocalDateTime completeTime;

    @Column(name = "CANCEL_TIME")
    private LocalDateTime cancelTime;

    @Column(name = "DELIVERY_SERVICE")
    @Enumerated(EnumType.STRING)
    private DeliveryService deliveryService;

    @OneToMany(mappedBy = "order", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<OrderDetail> orderDetails;

    @Column(name = "COGY_ORDER_CODE")
    private String cogyOrderCode;

    @Column(name = "DELIVERY_TRACKING_CODE")
    private String deliveryTrackingCode;


    public enum Status {
        REQUESTING,
        PENDING,
        DELIVERING,
        COMPLETE,
        CANCELED
    }


    @Getter
    public enum DeliveryService {
        GHN("Giao Hàng Nhanh"),
        GHTK("Giao Hàng Tiết Kiệm");

        private final String value;

        DeliveryService(String value) {
            this.value = value;
        }
    }

}
