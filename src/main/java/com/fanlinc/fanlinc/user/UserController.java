package com.fanlinc.fanlinc.user;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
//import com.fanlinc.fanlinc.fandom.FandomId;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

//import com.fanlinc.fanlinc.fandom.FandomId;

@RestController    // This means that this class is a Controller
@RequestMapping(path = "/api/users") // This means URL's start with /demo (after Application path)
public class UserController {

    private final UserService service;
    private final FandomService fservice;

    public UserController(UserService service, FandomService fservice) {
        this.service = service;
        this.fservice = fservice;
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/addUser") // Map ONLY POST Requests
    @ResponseBody
    public  User addNewUser (@RequestParam String firstName,
                             @RequestParam String lastName,
                             @RequestParam String email,
                             @RequestParam String password,
                             @RequestParam String description) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        User newUser = new User(firstName,lastName,email,password,description);
        return service.save(newUser);
    }

//    @PutMapping(path="/setDescription")
//    public @ResponseBody Iterable<User> () {
//        // This returns a JSON or XML with the users
//        return userRepository.findAll();
//    }
    @CrossOrigin(origins ="*")
    @GetMapping(path="/getUser") // Map ONLY GET Requests
    @ResponseBody
    public User getUser (@RequestParam String email, @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return service.findByEmailAndPassword(email, password);
    }

//    @PostMapping(path="/joinFandom") // Map ONLY POST Requests
//    @ResponseBody
//    public void JoinFandom (@RequestParam  String email, @RequestParam String fandomName) {
//        // @ResponseBody means the returned String is the response, not a view name
//        // @RequestParam means it is a parameter from the GET or POST request
//        User user = service.findByEmail(email);
//        Fandom fandom = fservice.findByFandomName(fandomName);
//        System.out.println(fandom.getFandomId());
//        System.out.println(user.getId());
//        fandom.setUsers(user);
//        user.setFandoms(fandom);
//        service.save(user);
//    }

    @PostMapping(path="/quitFandom") // Map ONLY POST Requests
    @ResponseBody
    public void QuitFandom (@RequestParam  String email, @RequestParam String fandomName) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        User user = service.findByEmail(email);
        Fandom fandom = fservice.findByFandomName(fandomName);
        System.out.println(fandom.getFandomId());
        System.out.println(user.getId());
        System.out.println(fandom.getUser().size());
        System.out.println(user.getFandoms().size());
        fandom.getUser().remove(user);
        user.getFandoms().remove(fandom);
        System.out.println(fandom.getUser().size());
        System.out.println(user.getFandoms().size());
        service.save(user);
    }

    @GetMapping(path="/findUserByEmail") // Map ONLY GET Requests
    @ResponseBody
    public User findUserByEmail (@RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return service.findByEmail(email);
    }

    @GetMapping(path="/findUserByName") // Map ONLY GET Requests
    @ResponseBody
    public List<User> findByFirstNameAndLastName (@RequestParam String firstName, @RequestParam String lastName) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return service.findByFirstNameAndLastName(firstName, lastName);
    }
}