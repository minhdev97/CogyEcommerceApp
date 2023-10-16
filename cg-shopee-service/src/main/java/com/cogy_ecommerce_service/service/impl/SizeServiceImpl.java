package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.SizeConverter;
import com.cogy_ecommerce_service.payload.response.SizeResponseDTO;
import com.cogy_ecommerce_service.repository.SizeRepository;
import com.cogy_ecommerce_service.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements SizeService {

    private final SizeRepository sizeRepository;

    private final SizeConverter sizeConverter;


    @Override
    public List<SizeResponseDTO> findByActiveTrue() {
        return sizeRepository.findByActiveTrue()
                .stream().map(sizeConverter::convertEntityToResponse).toList();
    }

}
