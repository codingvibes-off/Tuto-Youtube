package com.example.atelier_api_sullivan_sextius.exceptions;

public class InternalServerException extends RuntimeException {
    public InternalServerException(String message, Throwable cause) {
        super(message, cause);
    }
}
