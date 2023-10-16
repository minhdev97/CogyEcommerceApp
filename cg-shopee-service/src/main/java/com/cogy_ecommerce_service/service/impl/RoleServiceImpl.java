package com.cogy_ecommerce_service.service.impl;


import com.cogy_ecommerce_service.entity.Role;
import com.cogy_ecommerce_service.payload.response.RoleResponseDto;
import com.cogy_ecommerce_service.repository.RoleRepository;
import com.cogy_ecommerce_service.service.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
@ComponentScan(basePackageClasses = ModelMapper.class)
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    private final ModelMapper modelMapper;


    public RoleServiceImpl(RoleRepository roleRepository, ModelMapper modelMapper) {
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Iterable<RoleResponseDto> findAll() {
        Iterable<Role> entities = roleRepository.findAll();
        return StreamSupport.stream(entities.spliterator(), true)
                .map(entity -> modelMapper.map(entity, RoleResponseDto.class))
                .collect(Collectors.toList());
    }


    @Override
    public Optional<RoleResponseDto> findById(String id) {
        Role entity = roleRepository.findById(UUID.fromString(id)).orElse(null);
        return Optional.ofNullable(modelMapper.map(entity, RoleResponseDto.class));
    }


    @Override
    public void save(RoleResponseDto roleResponseDto) {
        Role role = modelMapper.map(roleResponseDto, Role.class);
        roleRepository.save(role);
    }


}
