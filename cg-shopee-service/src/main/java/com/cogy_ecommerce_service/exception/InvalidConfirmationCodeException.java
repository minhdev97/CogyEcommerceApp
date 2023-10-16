package com.cogy_ecommerce_service.exception;

import java.io.Serial;

public class InvalidConfirmationCodeException extends Exception{

    @Serial
    private static final long serialVersionUID = 1L;

    public InvalidConfirmationCodeException(String message) {
        super(message);
    }
}
