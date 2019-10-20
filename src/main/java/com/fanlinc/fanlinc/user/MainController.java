package com.fanlinc.fanlinc.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController    // This means that this class is a Controller
@RequestMapping(path="/api/users") // This means URL's start with /demo (after Application path)
public class MainController {

    private final UserService service;

    public MainController(UserService service) {
        this.service = service;
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
    public User getUser (@RequestBody Login newLogin) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        String email = newLogin.getEmail();
        String password = newLogin.getPassword();
        return service.findByEmailAndPassword(email, password);
    }

    @GetMapping(path="/findUserByEmail") // Map ONLY GET Requests
    @ResponseBody
    public User findUserByEmail (@RequestBody Map<String, String> body) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        String email = body.get("email");
        return service.findByEmail(email);
    }

    @GetMapping(path="/findUserByName") // Map ONLY GET Requests
    @ResponseBody
    public List<User> findByFirstNameAndLastName (@RequestBody Map<String, String> body) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        String firstName = body.get("firstName");
        String lastName = body.get("lastName");
        return service.findByFirstNameAndLastName(firstName, lastName);
    }
}