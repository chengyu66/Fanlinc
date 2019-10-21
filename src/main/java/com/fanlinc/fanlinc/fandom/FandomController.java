package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController    // This means that this class is a Controller
@RequestMapping(path="/api/fandoms")
public class FandomController {
    private final FandomService fservice;
    private final UserService service;

    public FandomController(FandomService fservice, UserService service)  {
        this.fservice = fservice;
        this.service = service;
    }

    @PostMapping(path="/createFandom") // Map ONLY POST Requests
    public Fandom createNewFandom (@RequestBody Map<String,String> body) {
        // @ResponseBody means the returned String is the response, not a view name
        String fandomName = body.get("fandomName");
        String email = body.get("email");
        System.out.println(body);
        System.out.println("testing "+fandomName);
        System.out.println("testing "+email);
        User user = service.findByEmail(email);
        Long ownerId = user.getId();
        String name = user.getFirstName()+user.getLastName();
        System.out.println("Owner Id: "+ownerId);
        System.out.println("Owner Name: "+name);
        Fandom fandom = new Fandom(fandomName,ownerId, email);
        fandom.setUsers(user);
        user.setFandoms(fandom);
        System.out.println(fandom.getUser());
        System.out.println(user.getFandoms());
        return fservice.save(fandom);
    }

}
