package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @CrossOrigin(origins = "*")
    @GetMapping(path="/findFandomById") // Map ONLY GET Requests
    @ResponseBody
    public Fandom findFandomById(@RequestParam long id) {
        return fservice.findByFandomId(id);
    }


    @CrossOrigin(origins ="*")
    @GetMapping(path="/findSimilarFandomByName") // Map ONLY GET Requests
    @ResponseBody
    public List<Fandom> findSimilarFandomByName (@RequestParam String name) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return fservice.findSimilarFandomByName(name);
    }

    @PostMapping(path="/createFandom") // Map ONLY POST Requests
    public Fandom createNewFandom (@RequestParam String fandomName, @RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
//        System.out.println(body);
//        System.out.println("testing "+fandomName);
//        System.out.println("testing "+email);
        User user = service.findByEmail(email);
        Long ownerId = user.getId();
        String name = user.getFirstName()+user.getLastName();
//        System.out.println("Owner Id: "+ownerId);
//        System.out.println("Owner Name: "+name);
        Fandom fandom = new Fandom(fandomName,ownerId, email);
        fandom.setUsers(user);
        user.setFandoms(fandom);
        Long fandomId = fandom.getFandomId();
//        System.out.println("fandomId: "+fandomId);
        return fservice.save(fandom);
    }
    @PostMapping(path="/joinFandom") // Map ONLY POST Requests
    @ResponseBody
    public void JoinFandom (@RequestParam  String email, @RequestParam String fandomName) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        User user = service.findByEmail(email);
        Fandom fandom = fservice.findByFandomName(fandomName);
        System.out.println(fandom.getFandomId());
        System.out.println(user.getId());
        fandom.setUsers(user);
        user.setFandoms(fandom);
        fservice.save(fandom);
    }

    @PostMapping(path="/quitFandom") // Map ONLY POST Requests
    @ResponseBody
    public void QuitFandom (@RequestParam  String email, @RequestParam String fandomName) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        User user = service.findByEmail(email);
        Fandom fandom = fservice.findByFandomName(fandomName);
        Long fidtoremove = fandom.getFandomId();
        Long uidtoremove = user.getId();
        System.out.println("fandomId to remove: "+fidtoremove);
        System.out.println("userId to remove: "+uidtoremove);
        System.out.println(user.getFandoms().size());
        System.out.println(fandom.getUser().size());
        System.out.println(user.getFandoms());
        System.out.println(fandom.getUser());
        System.out.println(fandom);
        System.out.println(user);
        for (User users: fandom.getUser()){
            System.out.println("users:" + users.getId());
            if (users.getId().equals(uidtoremove)){
                User temp = users;
                fandom.removeUser(temp);
                System.out.println("removing user...:" + users.getId());
            }

        }
        for (Fandom fandoms: user.getFandoms()) {
            System.out.println("fans: " + fandoms.getFandomId());
            if (fandoms.getFandomId().equals(fidtoremove)) {
                Fandom temp = fandoms;
                user.removeFandom(temp);
                System.out.println("removing fandom...:" + fandom.getFandomId());
            }
        }
        System.out.println(user.getFandoms());
        System.out.println(fandom.getUser());
        System.out.println(user.getFandoms().size());
        System.out.println(fandom.getUser().size());
        fservice.save(fandom);
    }

}
