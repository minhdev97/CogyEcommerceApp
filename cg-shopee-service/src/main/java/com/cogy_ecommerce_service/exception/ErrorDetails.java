package com.cogy_ecommerce_service.exception;

import java.util.Date;


public record ErrorDetails(Date timestamp, boolean success, String message, String details) {
}
