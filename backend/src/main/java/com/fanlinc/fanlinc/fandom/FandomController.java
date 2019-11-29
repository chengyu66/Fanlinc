package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.exceptions.FandomExistsException;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

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
        return fservice.findSimilarFandomByName(name);
    }


    @PostMapping(path="/createFandom") // Map ONLY POST Requests
    public Fandom createNewFandom (@RequestBody Fandom fandom) throws FandomExistsException {
        String email = fandom.getOwnerEmail();
        String fandomName = fandom.getFandomName();
        if (fservice.findByFandomName(fandomName) != null) {
            throw new FandomExistsException(fandomName);
        }
        User user = service.findByEmail(email);
        fandom.setUsers(user);
        user.setFandoms(fandom);
        return fservice.save(fandom);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/joinFandom") // Map ONLY POST Requests
    @ResponseBody
    public void JoinFandom (@RequestBody Map<String, String> values) {
        User user = service.findByEmail(values.get("email"));
        Fandom fandom = fservice.findByFandomName(values.get("fandomName"));
        System.out.println(fandom.getFandomId());
        System.out.println(user.getId());
        fandom.setUsers(user);
        user.setFandoms(fandom);
        fservice.save(fandom);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/quitFandom") // Map ONLY POST Requests
    @ResponseBody
    public void QuitFandom (@RequestBody Map<String, String> values) {
        User user = service.findByEmail(values.get("email"));
        Fandom fandom = fservice.findByFandomName(values.get("fandomName"));
        Long fidtoremove = fandom.getFandomId();
        Long uidtoremove = user.getId();
        for (User users: fandom.getUser()){
            if (users.getId().equals(uidtoremove)){
                fandom.removeUser(users);
                break;
            }
        }
        for (Fandom fandoms: user.getFandoms()) {
            if (fandoms.getFandomId().equals(fidtoremove)) {
                user.removeFandom(fandoms);
                break;
            }
        }
        fservice.save(fandom);
    }

}
