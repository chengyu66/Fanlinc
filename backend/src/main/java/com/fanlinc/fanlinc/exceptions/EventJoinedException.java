package com.fanlinc.fanlinc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Event already joined")
public class EventJoinedException extends Exception {

    public EventJoinedException(String eventName) {
        super("Event already joined: " + eventName);
    }

}
