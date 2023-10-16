package com.cogy_ecommerce_service.converter;

import com.cogy_ecommerce_service.entity.Role;
import com.cogy_ecommerce_service.payload.response.RoleResponseDto;

import java.util.Set;

public interface RoleConverter {

    Set<RoleResponseDto> convertSetEntitiesToSetResponses(Set<Role> roles);

}
