package com.mdmk.youneed.controller.advice;


import com.mdmk.youneed.service.InvalidDataException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CompanyControllerAdvice {

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<String> invalidDataException(InvalidDataException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
