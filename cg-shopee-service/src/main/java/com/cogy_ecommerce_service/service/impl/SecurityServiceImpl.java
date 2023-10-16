package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.security.JwtTokenProvider;
import com.cogy_ecommerce_service.service.SecurityService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class SecurityServiceImpl implements SecurityService {

    private final JwtTokenProvider jwtTokenProvider;


    public SecurityServiceImpl(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    public boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || AnonymousAuthenticationToken.class.isAssignableFrom(authentication.getClass())) {
            return false;
        }
        return authentication.isAuthenticated();
    }


    @Override
    public boolean isValidToken(String authToken) {
        String jwt = jwtTokenProvider.getJwtFromBearerToken(authToken);
        return StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(authToken);
    }

}
