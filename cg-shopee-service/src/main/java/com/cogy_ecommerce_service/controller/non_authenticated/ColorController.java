package com.cogy_ecommerce_service.controller.non_authenticated;

import com.cogy_ecommerce_service.payload.response.ColorResponseDTO;
import com.cogy_ecommerce_service.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/colors")
public class ColorController {

    private final ColorService colorService;


    @GetMapping
    public ResponseEntity<?> findAllColors() {
        List<ColorResponseDTO> colors = colorService.findByActiveTrue();
        if (colors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(colors, HttpStatus.OK);
    }


}
