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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.PositiveOrZero;
import java.util.Collection;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "active = true")
public class Variant {
    @Id
    @Type(type="uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(name = "import_price")
    private Double importPrice;

    @Column(name = "sale_price")
    private Double salePrice;

    @Column(name = "discount_price")
    private Double discountPrice;

    private Integer stock;

    private Long weight;//gram

    @PositiveOrZero
    @Column(name = "NUMBER_OF_PURCHASE")
    private Long numberOfPurchase;

    private boolean active;

    @Column(name = "is_shown")
    private boolean isShown;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "size_id", referencedColumnName = "id")
    private Size size;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "color_id", referencedColumnName = "id")
    private Color color;

    @OneToMany(mappedBy = "variant", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<CartLine> cartLines;

    @Override
    public String toString() {
        return String.format("id = %s, importPrice = %f, salePrice = %f, stock = %d, isShown = %b",
                getId(), getImportPrice(), getSalePrice(), getStock(), isShown());
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Variant variant = (Variant) obj;
        return Objects.equals(id == null ? null : id.toString(), variant.id == null ? null : variant.id.toString())
                && Objects.equals(size.getName(), variant.getSize().getName())
                && Objects.equals(color.getName(), variant.getColor().getName());
    }
}
