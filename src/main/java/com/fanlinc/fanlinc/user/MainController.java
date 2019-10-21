package com.fanlinc.fanlinc.user;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
//import com.fanlinc.fanlinc.fandom.FandomId;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController    // This means that this class is a Controller
@RequestMapping(path="/api/users") // This means URL's start with /demo (after Application path)
public class MainController {

    private final UserService service;
    private final FandomService fservice;

    public MainController(UserService service, FandomService fservice) {
        this.service = service;
        this.fservice = fservice;
    }

    @PostMapping(path="/addUser") // Map ONLY POST Requests
    @ResponseBody
    public  User addNewUser (@RequestBody User newUser) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return service.save(newUser);
    }

//    @PutMapping(path="/setDescription")
//    public @ResponseBody Iterable<User> () {
//        // This returns a JSON or XML with the users
//        return userRepository.findAll();
//    }

    @GetMapping(path="/getUser") // Map ONLY GET Requests
    @ResponseBody
    public User getUser (@RequestParam String email, @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return service.findByEmailAndPassword(email, password);
    }

//    @PostMapping(path="/joinFandom") // Map ONLY POST Requests
//    @ResponseBody
//    public void JoinFandom (@RequestBody  UserId userId, @RequestBody FandomId fandomId) {
//        // @ResponseBody means the returned String is the response, not a view name
//        // @RequestParam means it is a parameter from the GET or POST request
//        Long uId = userId.getUserId();
//        User existUser = service.findByUserId(uId);
//        Long fId = fandomId.getFandomId();
//        Fandom existFandom = fservice.findByFandomId(fId);
//        existUser.setFandoms(existFandom);
//    }


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