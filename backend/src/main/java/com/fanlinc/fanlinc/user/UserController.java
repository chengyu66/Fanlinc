package com.fanlinc.fanlinc.user;

import com.fanlinc.fanlinc.exceptions.EmailExistsException;
import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
//import com.fanlinc.fanlinc.fandom.FandomId;
import org.springframework.web.bind.annotation.*;

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
    public  User addNewUser (@RequestBody User newUser) throws EmailExistsException {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //User newUser = new User(firstName,lastName,email,password,description);
        String email = newUser.getEmail();
        if (service.existsByEmail(email)) {
            throw new EmailExistsException(email);
        } 
        return service.save(newUser);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/updateUser") // Map ONLY POST Requests
    @ResponseBody
    public  User updateNewUser (@RequestBody User newUpdate) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        //User newUser = new User(firstName,lastName,email,password,description);
        String email = newUpdate.getEmail();
        User updatedUser = service.findByEmail(email);
        updatedUser.setFirstName(newUpdate.getFirstName());
        updatedUser.setLastName(newUpdate.getLastName());

        return service.save(updatedUser);
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

    @CrossOrigin(origins ="*")
    @GetMapping(path="/findUserByEmail") // Map ONLY GET Requests
    @ResponseBody
    public User findUserByEmail (@RequestParam String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println(email);
        return service.findByEmail(email);
    }
    @CrossOrigin(origins ="*")
    @GetMapping(path="/findUserByName") // Map ONLY GET Requests
    @ResponseBody
    public List<User> findByFirstNameAndLastName (@RequestParam String firstName, @RequestParam String lastName) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return service.findByFirstNameAndLastName(firstName, lastName);
    }

    @CrossOrigin(origins ="*")
    @GetMapping(path="/findSimilarUserByName") // Map ONLY GET Requests
    @ResponseBody
    public List<User> findSimilarByFirstNameAndLastName (@RequestParam String firstName, @RequestParam String lastName) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return service.findSimilarByFirstNameAndLastName(firstName, lastName);
    }

}