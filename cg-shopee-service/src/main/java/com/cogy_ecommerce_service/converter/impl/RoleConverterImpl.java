package com.cogy_ecommerce_service.converter.impl;

import com.cogy_ecommerce_service.converter.RoleConverter;
import com.cogy_ecommerce_service.entity.Role;
import com.cogy_ecommerce_service.payload.response.RoleResponseDto;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RoleConverterImpl implements RoleConverter {

    @Override
    public Set<RoleResponseDto> convertSetEntitiesToSetResponses(Set<Role> roles) {
        return roles.stream().map(role -> new RoleResponseDto(role.getName()))
                .collect(Collectors.toSet());
    }


}
