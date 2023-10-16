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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Voucher {
    @Id
    @Type(type="uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(name = "NAME_PROMOTION", length = 25, nullable = false)
    private String namePromotion;

    @Column(length = 25, nullable = false)
    private String code;

    @Column(length = 25, nullable = false)
    private Long value;

    @Column(length = 25, nullable = false)
    private String type;

    @Column(name = "TIME_CREATE", nullable = false)
    private LocalDateTime timeCreate;

    @Column(name = "TIME_START", nullable = false)
    private LocalDateTime timeStart;

    @Column(name = "TIME_END", nullable = false)
    private LocalDateTime timeEnd;

    @Column(name = "MAX_USED", nullable = false)
    private Integer maxUsed;

    @Column(name = "REQUIREMENT")
    private Long requirement;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "voucher", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<Product> products;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "SELLER_ID", referencedColumnName = "ID")
    private Seller seller;

    public enum Status {
        DISABLED,
        ACTIVE,
        PENDING,
        EXPIRED
    }
}