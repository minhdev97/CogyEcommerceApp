package com.cogy_ecommerce_service.controller.advice;

import com.cogy_ecommerce_service.exception.DuplicateFieldUserException;
import com.cogy_ecommerce_service.exception.ErrorDetails;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.management.MBeanRegistrationException;
import javax.validation.ConstraintViolationException;
import java.util.Date;

@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> handleAllException(Exception ex, WebRequest request) {
//        ErrorDetails errorDetails = new ErrorDetails(
//                new Date(), ex.getMessage(), request.getDescription(false)
//        );
//        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//
//
//    @ExceptionHandler(ResourceNotFoundException.class)
//    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
//        ErrorDetails errorDetails = new ErrorDetails(
//                new Date(), ex.getMessage(), request.getDescription(false)
//        );
//        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
//    }
//
//
//    @ExceptionHandler(NullPointerException.class)
//    public ResponseEntity<?> handleNullPointerException(NullPointerException ex, WebRequest request) {
//        ErrorDetails errorDetails = new ErrorDetails(
//                new Date(), ex.getMessage(), request.getDescription(false)
//        );
//        return new ResponseEntity<>(errorDetails, HttpStatus.UNPROCESSABLE_ENTITY);
//    }
//
//
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(), false, "Invalid input data", request.getDescription(false)
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.UNPROCESSABLE_ENTITY);
    }



    @ExceptionHandler(DuplicateFieldUserException.class)
    public ResponseEntity<?> handleDuplicateFieldUserException(DuplicateFieldUserException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(), false, "User data is duplicated " + ex.getMessage(), request.getDescription(false)
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.UNPROCESSABLE_ENTITY);
    }


    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(
                new Date(), false, "Invalid input data", request.getDescription(false)
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.UNPROCESSABLE_ENTITY);
    }


}
