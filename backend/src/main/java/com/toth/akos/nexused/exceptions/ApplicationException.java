package com.toth.akos.nexused.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApplicationException extends RuntimeException {
    private final HttpStatus status;
    public ApplicationException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

}
