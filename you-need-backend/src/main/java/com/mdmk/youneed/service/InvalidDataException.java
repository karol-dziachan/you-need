package com.mdmk.youneed.service;

public class InvalidDataException extends RuntimeException {
    public InvalidDataException() {
        super("Invalid data provided");
    }
}
