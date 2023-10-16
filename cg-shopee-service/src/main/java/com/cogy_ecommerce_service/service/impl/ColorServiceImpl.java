package com.cogy_ecommerce_service.service.impl;

import com.cogy_ecommerce_service.converter.ColorConverter;
import com.cogy_ecommerce_service.payload.response.ColorResponseDTO;
import com.cogy_ecommerce_service.repository.ColorRepository;
import com.cogy_ecommerce_service.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {

    private final ColorRepository colorRepository;

    private final ColorConverter colorConverter;


    @Override
    public List<ColorResponseDTO> findByActiveTrue() {
        return colorRepository.findByActiveTrue()
                .stream().map(colorConverter::convertEntityToResponse).toList();
    }

}
