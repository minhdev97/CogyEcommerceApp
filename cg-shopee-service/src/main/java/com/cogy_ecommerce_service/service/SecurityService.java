package com.cogy_ecommerce_service.service;

public interface SecurityService {

    boolean isAuthenticated();

    boolean isValidToken(String token);

}
