package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.exceptions.FandomExistsException;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
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

    @CrossOrigin(origins ="*")
    @GetMapping(path="/findUserInFandom") // Find if this user is in fandom
    @ResponseBody
    public User findUser (@RequestParam Long userId, @RequestParam Long fandomId) {
        Fandom fandom = findFandomById(fandomId);
        User temp = null;
        for (User user: fandom.getUser()){
            System.out.println("users:" + user.getId());
            if (user.getId().equals(userId)) {
                temp = user;
            }
        }
        return temp;
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
                fandom.removeUser(users);
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
