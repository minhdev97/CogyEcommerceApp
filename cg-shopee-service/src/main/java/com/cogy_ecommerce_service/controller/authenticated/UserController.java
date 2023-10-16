package com.cogy_ecommerce_service.controller.authenticated;

import com.cogy_ecommerce_service.payload.request.ProfileRequestDTO;

import com.cogy_ecommerce_service.payload.request.UserLocationRequestDTO;
import com.cogy_ecommerce_service.payload.response.ListUserLocationResponseDTO;
import com.cogy_ecommerce_service.payload.response.OrderHistoryResponseDTO;
import com.cogy_ecommerce_service.payload.response.ProfileResponseDTO;
import com.cogy_ecommerce_service.payload.response.UserLocationResponseDTO;
import com.cogy_ecommerce_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/users/{id}")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profiles")
    public ResponseEntity<?> findUserByUserId(@PathVariable String id) {
        ProfileResponseDTO profileResponseDTO = userService.findByUserId(id);
        return new ResponseEntity<>(profileResponseDTO, HttpStatus.OK);
    }


    @PutMapping("/profiles")
    public ResponseEntity<?> updateProfile(@PathVariable String id,@Valid @RequestBody ProfileRequestDTO profileRequestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        ProfileResponseDTO updatedProfile = userService.update(id, profileRequestDTO);
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }


    @GetMapping("/locations")
    public ResponseEntity<?> findLocationByUserId(@PathVariable String id) {
        ListUserLocationResponseDTO locations = userService.findLocationByUserId(id);
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    @PostMapping("/locations")
    public ResponseEntity<?> saveUserLocation(
            @PathVariable String id,
            @Valid @RequestBody UserLocationRequestDTO requestDTO
    ) {
        UserLocationResponseDTO responseDTO = userService.saveUserLocation(id, requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

}
