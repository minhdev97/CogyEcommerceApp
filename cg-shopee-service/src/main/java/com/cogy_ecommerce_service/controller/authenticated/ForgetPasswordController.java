package com.cogy_ecommerce_service.controller.authenticated;

import com.cogy_ecommerce_service.exception.InvalidConfirmationCodeException;
import com.cogy_ecommerce_service.payload.request.ForgetPasswordRequestDTO;
import com.cogy_ecommerce_service.payload.response.ForgetPasswordResponseDTO;
import com.cogy_ecommerce_service.service.PasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.DuplicateFormatFlagsException;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api")
public class ForgetPasswordController {

    private final PasswordService passwordService;

    @PostMapping("/confirm-email")
    public ResponseEntity<?> validateEmail(@RequestBody ForgetPasswordRequestDTO requestDTO) {
        try{
            passwordService.isValidateEmail(requestDTO);
            return ResponseEntity.ok("Confirmation email sent successfully");
        } catch (DuplicateFormatFlagsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<?> sentNewPassword(@RequestBody ForgetPasswordRequestDTO requestDTO){
        try{
            passwordService.resetPassword(requestDTO);
            return ResponseEntity.ok("Password reset successfully");
        } catch (InvalidConfirmationCodeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
