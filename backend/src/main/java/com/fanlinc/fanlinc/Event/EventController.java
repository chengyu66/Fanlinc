package com.fanlinc.fanlinc.Event;
import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path="/api/events")
public class EventController {
    private final FandomService fservice;
    private final EventService eservice;
    private final UserService uservice;


    public EventController(FandomService fservice,
                             UserService uservice,
                             EventService eservice)  {
        this.fservice = fservice;
        this.eservice = eservice;
        this.uservice = uservice;
    }
    @CrossOrigin(origins = "*")
    @PostMapping(path="/createEvent") // Map ONLY POST Requests
    public Event createNewEvent (@RequestBody Event newEvent) {
        // find the owner
        String ownerEmail = newEvent.getOwnerEmail();
        User owner = uservice.findByEmail(ownerEmail);

        Fandom fandom = fservice.findByFandomId(newEvent.getFandom_id());
        newEvent.setFandom(fandom);
//         add the owner to the evenr
        return eservice.save(newEvent);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/joinEvent") // Map ONLY POST Requests
    public void JoinEvent (@RequestBody Map<String, String> values) {
        // get owner
        //Event event = eservice.findByEventId(newEvent.getEventId());
        // System.out.println(event.getOwnerEmail());

        Event event = eservice.findByEventId(new Long(values.get("eventId")));
        User user = uservice.findByEmail(values.get("email"));
//        System.out.println(fandom.getFandomId());
//        System.out.println(user.getId());
        System.out.println(event.getParticipants().contains(user));
        event.setParticipants(user);
        System.out.println(event.getParticipants().contains(user));
        user.setEvent(event);
        System.out.println(user.getEvent().contains(event));
        eservice.save(event);
    }



//    @CrossOrigin(origins = "*")
//    @PutMapping(path="/joinEvent") // Map ONLY POST Requests
//    public void QuitEvent (@RequestBody )

}