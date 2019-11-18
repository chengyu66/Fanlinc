package com.fanlinc.fanlinc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Fandom with the same name already exists")
public class FandomExistsException extends Exception {

    public FandomExistsException(String fandomName) {
        super("fandom already created: " + fandomName);
    }

}
