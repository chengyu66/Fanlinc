package com.fanlinc.fanlinc.Event;

import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends CrudRepository<Event, Long> {
    Event findByEventId(Long id);
    Event findByEventName(String eventName);
}
