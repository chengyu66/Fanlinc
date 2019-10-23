package com.fanlinc.fanlinc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Email already registered")
public class EmailExistsException extends Exception {

    public EmailExistsException(String email) {
        super("Email already registered : " + email);
    }

}
