package com.example.tacking.user.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserDisabledException extends RuntimeException{
    public UserDisabledException(String message){
        super(message);
    }
}
