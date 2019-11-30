package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.exceptions.FandomExistsException;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.post.Post;
import com.fanlinc.fanlinc.service.FileStorageService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController    // This means that this class is a Controller
@RequestMapping(path="/api/fandoms")
public class FandomController {
    private final FandomService fservice;
    private final UserService service;
    @Autowired
    private FileStorageService fileStorageService;

    public FandomController(FandomService fservice, UserService service)  {
        this.fservice = fservice;
        this.service = service;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/uploadFile")
    public Fandom uploadFile(@RequestParam("file") MultipartFile file,
                           @RequestParam("fid") Long fid) {
        Fandom fandom = fservice.findByFandomId(fid);
        String fileName = "id" + fid.toString() + "_fandom_picture";
        fileStorageService.storeFile(file,fileName);
        fandom.setFandom_pic(fileName);
        return fservice.save(fandom);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/downloadFile")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam("fid") Long fid){
        Fandom fandom = fservice.findByFandomId(fid);
        String fileName = fandom.getFandom_pic();
        System.out.println(fileName);
        byte[] data = Base64.getEncoder().encodeToString(fileStorageService.downloadFile(fileName)).getBytes();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .contentLength(data.length)
                .body(new ByteArrayResource(data));
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
