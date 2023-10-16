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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USER_LOCATION")
public class UserLocation {
    @Id
    @Type(type="uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(name = "DEPUTY_NAME")
    private String deputyName;

    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

    private String province;

    private String district;

    private String ward;

    private String hamlet;

    private String address;

    @Column(name = "TYPE_ADDRESS")
    private String typeAddress;

    @Column(name = "IS_DEFAULT_ADDRESS")
    private boolean isDefaultAddress;


    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn
    private User user;

}
