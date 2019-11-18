package com.fanlinc.fanlinc.Event;
import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.web.bind.annotation.*;

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
        String ownerEmail = newEvent.getOwnerEmail();
        User owner = uservice.findByEmail(ownerEmail);
        Long ownerId = owner.getId();
        Fandom fandom = fservice.findByFandomId(newEvent.getFandom_id());
        newEvent.setFandom(fandom);
//         add the owner to the evenr
        return eservice.save(newEvent);
    }

}