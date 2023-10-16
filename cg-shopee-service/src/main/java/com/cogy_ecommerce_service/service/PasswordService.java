package com.cogy_ecommerce_service.service;

import com.cogy_ecommerce_service.exception.InvalidConfirmationCodeException;
import com.cogy_ecommerce_service.payload.request.ForgetPasswordRequestDTO;

import java.util.DuplicateFormatFlagsException;

public interface PasswordService {

    void isValidateEmail(ForgetPasswordRequestDTO forgetPasswordRequestDTO) throws DuplicateFormatFlagsException;

    void resetPassword(ForgetPasswordRequestDTO forgetPasswordRequestDTO) throws InvalidConfirmationCodeException;
}
