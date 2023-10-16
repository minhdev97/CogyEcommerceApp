package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.payload.request.LoginRequestDTO;
import org.springframework.security.core.Authentication;

public interface LoginService {

    Authentication authenticateUser(String username, String password);

    String generateToken(Authentication authentication);

    LoginRequestDTO getUser(String username);

}
