package com.toth.akos.nexused.config;

import com.toth.akos.nexused.dtos.ErrorDTO;
import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {ApplicationException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handleException(ApplicationException e) {
        return ResponseEntity.status(e.getStatus())
                .body(new ErrorDTO(e.getMessage()));
    }
}
