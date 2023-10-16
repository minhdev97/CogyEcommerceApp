package com.cogy_ecommerce_service.entity;

import jdk.jshell.Snippet;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.Collection;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(name = "user_uk", columnNames = {"email", "phone", "username"})})
public class User {
    @Id
    @Type(type="uuid-char")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(length = 20, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(length = 12, nullable = false)
    private String phone;

    @Column(nullable = false)
    private Double wallet;

    @Column(name = "FULL_NAME", length = 50)
    private String fullName;

    @Column(length = 6)
    private String gender;

    @Column(length = 50)
    private String email;

    @Column
    private String avatar;

    private boolean active;

    @Column(name = "CONFIRMATION_CODE")
    private String confirmationCode;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "USERS_ROLES",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
    private Set<Role> roles;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Seller seller;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Cart cart;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<UserLocation> locations;

    @OneToMany(mappedBy = "buyer", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Collection<Order> orders;

    @Override
    public String toString() {
        return String.format("id = %s, fullName = %s, username = %s, email = %s, phone = %s",
                getId(), getFullName(), getUsername(), getEmail(), getPhone());
    }

    public String getConfirmationCode() {
        return confirmationCode;
    }

    public void setConfirmationCode(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public enum Status {
        PENDING_CONFIRMATION,
        ACTIVE,
        INACTIVE
    }


    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}

