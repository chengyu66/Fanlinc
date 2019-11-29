package com.fanlinc.fanlinc.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private final EventRepository eventRepository;

    public EventService(EventRepository repo) {
        this.eventRepository = repo;
    }

    public Event save(Event event) {
        eventRepository.save(event);
        return event;
    }


    public Event findByEventName(String eventName){
        return eventRepository.findByEventName(eventName);
    }
    public Event findByEventId(Long id){
        return eventRepository.findByEventId(id);
    }
    public List<Event> findByFandomId(Long id){return eventRepository.findByFandomIdOrderByDateDesc(id);}
}
