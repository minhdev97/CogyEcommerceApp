package com.cogy_ecommerce_service.service;



import com.cogy_ecommerce_service.payload.response.RoleResponseDto;

import java.util.Optional;

public interface RoleService {

    Iterable<RoleResponseDto> findAll();

    Optional<RoleResponseDto> findById(String id);

    void save(RoleResponseDto roleResponseDto);

}
