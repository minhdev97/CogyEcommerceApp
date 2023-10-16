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
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Seller {
    @Id
    @Type(type="uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(length = 50, nullable = false)
    private String name;

    private String image;

    @Column(name = "CREATION_TIME")
    private LocalDateTime creationTime;

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn
    private User user;

    @OneToMany(mappedBy = "seller", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<Product> products;

    @OneToMany(mappedBy = "seller", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<SellerLocation> locations;

    @OneToMany(mappedBy = "seller", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<Order> orders;

    @OneToMany(mappedBy = "seller", cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private Collection<Voucher> vouchers;
}
