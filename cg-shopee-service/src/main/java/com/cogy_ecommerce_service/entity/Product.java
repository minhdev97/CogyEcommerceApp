package com.cogy_ecommerce_service.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
@Where(clause = "active = true")
public class Product {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String description;

    private String image;

    @PositiveOrZero
    private Long view;

    @PositiveOrZero
    @Column(name = "NUMBER_OF_PURCHASE")
    private Long numberOfPurchase;

    @PositiveOrZero
    @Column(name = "MIN_PRICE_OF_VARIANTS")
    private Double minPriceOfVariants;

    @PositiveOrZero
    @Column(name = "MAX_PRICE_OF_VARIANTS")
    private Double maxPriceOfVariants;

    @Column(name = "DEFINITION_OF_COLOR")
    private String definitionOfColor;

    @Column(name = "DEFINITION_OF_SIZE")
    private String definitionOfSize;

    @Column(name = "IS_SHOWN")
    private boolean isShown;

    private boolean active;

    @Column(name = "CREATION_TIME")
    private LocalDateTime creationTime;

    @OneToMany(mappedBy = "product", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<Photo> photos;

    @OneToMany(mappedBy = "product", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<Variant> variants;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "SUB_CATEGORY_ID", referencedColumnName = "ID")
    private SubCategory subCategory;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn
    private Seller seller;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "VOUCHER_ID", referencedColumnName = "ID")
    private Voucher voucher;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s, description = %s, image = %s, active = %b, isShown = %b",
                getId(), getName(), getDescription(), getImage(), isActive(), isShown());
    }
}
