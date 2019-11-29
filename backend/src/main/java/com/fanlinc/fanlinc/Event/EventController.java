package com.fanlinc.fanlinc.Event;
//import com.fanlinc.fanlinc.exceptions.EventExistsException;
import com.fanlinc.fanlinc.exceptions.EventJoinedException;
import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.service.FileStorageService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path="/api/events")
public class EventController {
    private final FandomService fservice;
    private final EventService eservice;
    private final UserService uservice;
    @Autowired
    private FileStorageService fileStorageService;


    public EventController(FandomService fservice,
                             UserService uservice,
                             EventService eservice)  {
        this.fservice = fservice;
        this.eservice = eservice;
        this.uservice = uservice;
    }
    @CrossOrigin(origins = "*")
    @PostMapping(path="/createEvent") // Map ONLY POST Requests
    public Event createNewEvent (@RequestBody Event newEvent) /*throws EventExistsException*/ {
        // check event same name
//        if (eservice.findByEventName(newEvent.getEventName()) != null) {
//            throw new EventExistsException(newEvent.getEventName());
//        }
        // find the owner
        String ownerEmail = newEvent.getOwnerEmail();
        User owner = uservice.findByEmail(ownerEmail);
        Fandom fandom = fservice.findByFandomId(newEvent.getFandom_id());
        newEvent.setFandom(fandom);
//         add the owner to the event
        return eservice.save(newEvent);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/joinEvent") // Map ONLY POST Requests
    public Event JoinEvent (@RequestBody Map<String, String> values) throws EventJoinedException {
        // get owner
        //Event event = eservice.findByEventId(newEvent.getEventId());
        // System.out.println(event.getOwnerEmail());
        Event event = eservice.findByEventId(Long.valueOf(values.get("eventId")));
        User user = uservice.findByEmail(values.get("email"));
        for (User users: event.getParticipants()){
            if (users.getId().equals(user.getId())){
                throw new EventJoinedException(event.getEventName());
            }
        }
//        System.out.println(fandom.getFandomId());
//        System.out.println(user.getId());
        event.setParticipants(user);
        user.setEvent(event);
        return eservice.save(event);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findByEventId") // Map ONLY GET Requests
    @ResponseBody
    public Event findByEventId(@RequestParam Long id) {
        return eservice.findByEventId(id);
    }


    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findByFandomId") // Map ONLY GET Requests
    @ResponseBody
    public List<Event> findByFandomId(@RequestParam Long id) {
        return eservice.findByFandomId(id);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/uploadFile")
    public Event uploadFile(@RequestParam("file") MultipartFile file,
                             @RequestParam("eid") Long eid) {
        Event event = eservice.findByEventId(eid);
        String fileName = "id" + eid.toString() + "_event_picture";
        fileStorageService.storeFile(file,fileName);
        event.setEvent_pic(fileName);
        return eservice.save(event);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("/downloadFile")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam("eid") Long eid){
        Event event = eservice.findByEventId(eid);
        String fileName = event.getEvent_pic();
        System.out.println(fileName);
        byte[] data = Base64.getEncoder().encodeToString(fileStorageService.downloadFile(fileName)).getBytes();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .contentLength(data.length)
                .body(new ByteArrayResource(data));
    }



//    @CrossOrigin(origins = "*")
//    @PutMapping(path="/joinEvent") // Map ONLY POST Requests
//    public void QuitEvent (@RequestBody )

}