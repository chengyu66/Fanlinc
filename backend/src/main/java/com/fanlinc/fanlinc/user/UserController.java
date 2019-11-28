package com.fanlinc.fanlinc.user;

import com.fanlinc.fanlinc.exceptions.EmailExistsException;
import com.fanlinc.fanlinc.property.FileStorageProperties;
import com.fanlinc.fanlinc.exceptions.MyFileNotFoundException;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@RestController    // This means that this class is a Controller
@RequestMapping(path = "/api/users") // This means URL's start with /demo (after Application path)
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService service;
    private final FandomService fservice;
    @Autowired
    private FileStorageService fileStorageService;
    private final Path fileStorageLocation;

    public UserController(UserService service,
                          FandomService fservice,
                          FileStorageProperties fileStorageProperties) {
        this.service = service;
        this.fservice = fservice;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
    }


    @PostMapping("/uploadFile")
    public User uploadFile(@RequestParam("file") MultipartFile file,
                                         @RequestParam("email") String email) {
        User user = service.findByEmail(email);
        Long uid = user.getId();
        String fileName = fileStorageService.storeFile(file,uid);
        user.setProfile_pic(fileName);
        return service.save(user);
    }

    @GetMapping("/downloadFile")
    public ResponseEntity<Resource> downloadFile(@RequestParam("email") String email,
                                                 HttpServletRequest request){
        User user = service.findByEmail(email);
        String fileName = user.getProfile_pic();
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return  ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

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