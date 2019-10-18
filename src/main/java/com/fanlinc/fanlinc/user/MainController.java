package com.fanlinc.fanlinc.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController    // This means that this class is a Controller
@RequestMapping(path="/api/users") // This means URL's start with /demo (after Application path)
public class MainController {

    private final UserService service;

    public MainController(UserService service) {
        this.service = service;
    }

    @PostMapping(path="/add") // Map ONLY POST Requests
    @ResponseBody
    public  User addNewUser (@RequestBody User newUser) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return service.save(newUser);
    }

//    @GetMapping(path="/all")
//    public @ResponseBody Iterable<User> getAllUsers() {
//        // This returns a JSON or XML with the users
//        return userRepository.findAll();
//    }

}