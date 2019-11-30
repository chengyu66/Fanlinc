package com.fanlinc.fanlinc.post;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.fanlinc.fanlinc.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.web.multipart.MultipartFile;

@RestController    // This means that this class is a Controller
@RequestMapping(path = "/api/posts") // This means URL's start with /demo (after Application path)
public class PostController {
	private final UserService service;
    private final FandomService fservice;
    private final PostService pservice;
    @Autowired
    private FileStorageService fileStorageService;

    public PostController(UserService service, FandomService fservice, PostService pservice) {
        this.service = service;
        this.fservice = fservice;
        this.pservice = pservice;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/uploadFile")
    public Post uploadFile(@RequestParam("file") MultipartFile file,
                           @RequestParam("pid") Long pid) {
        Post post = pservice.findByPostId(pid);
        String fileName = "id" + pid.toString() + "_post_picture";
        fileStorageService.storeFile(file,fileName);
        post.setPostPic(fileName);
        return pservice.save(post);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/downloadFile")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam("pid") Long pid){
        Post post = pservice.findByPostId(pid);
        String fileName = post.getPostPic();
        System.out.println(fileName);
        byte[] data = Base64.getEncoder().encodeToString(fileStorageService.downloadFile(fileName)).getBytes();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .contentLength(data.length)
                .body(new ByteArrayResource(data));
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/post") // Map ONLY POST Requests
    public Post post (@RequestBody Post post) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
    	SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        post.setTime(dateFormat.format(new Date()));

        return pservice.save(post);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/edit") // Map ONLY PUT Requests
    @ResponseBody
    public void edit (@RequestBody Map<String, String> values) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        String title = values.get("title");
        String content = values.get("content");
        Long id = Long.parseLong(values.get("id"));
        Post post = pservice.findByPostId(id);
        post.setPostTitle(title);
        post.setContent(content);
        pservice.save(post);
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findByPostId") // Map ONLY GET Requests
    @ResponseBody
    public Post findByPostId(@RequestParam Long id) {
    	return pservice.findByPostId(id);
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findByEmail") // Map ONLY GET Requests
    @ResponseBody
    public List<Post> findByEmail(@RequestParam String email) {
    	return pservice.findByEmail(email);
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findByFandomId") // Map ONLY GET Requests
    @ResponseBody
    public List<Post> findByFandomId(@RequestParam Long id) {
    	return pservice.findByFandomId(id);
    }
    
    @CrossOrigin(origins = "*")
    @DeleteMapping(path = "/delete") // Map ONLY DELETE Requests
    @ResponseBody
    @Transactional
    public void deleteByPostId(@RequestParam Long id) {
    	pservice.deleteByPostId(id);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/userLike") // Map ONLY POST Requests
    @ResponseBody
    public int userLike (@RequestBody Map<String, String> values) {
        //System.out.println(postID);
        Post post = pservice.findByPostId(Long.parseLong(values.get("postId")));
        //System.out.println(post);
        User user = service.findByEmail(values.get("email"));
        //System.out.println(user);
        post.setLike(user);
        user.setLiked(post);
        pservice.save(post);
        return post.getLikeNum();
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/userUnlike") // Map ONLY POST Requests
    @ResponseBody
    public int userUnlike (@RequestBody Map<String, String> values) {
        //System.out.println(postID);
        Post post = pservice.findByPostId(Long.parseLong(values.get("postId")));
        //System.out.println(post);
        User user = service.findByEmail(values.get("email"));
        //System.out.println(user);
        Long pid = post.getPostId();
        Long uid = user.getId();
        for (User users: post.getLike()){
            if (users.getId().equals(uid)){
                post.removeLike(users);
                break;
            }
        }
        for (Post posts: user.getLike()) {
            if (posts.getFandomId().equals(pid)) {
                user.removeLiked(posts);
                break;
            }
        }
        pservice.save(post);
        return post.getLikeNum();
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path = "/isUserLiked") // Map ONLY POST Requests
    @ResponseBody
    public boolean isUserLiked (@RequestParam Long postId, @RequestParam String email) {
        //System.out.println(postID);
        Post post = pservice.findByPostId(postId);
        //System.out.println(post);
        User user = service.findByEmail(email);
        return post.isUserLike(user.getId());
    }

//    @CrossOrigin(origins ="*")
//    @GetMapping(path="/isUserLiked") // Map ONLY GET Requests
//    @ResponseBody
//    public boolean isUserLike (@RequestParam Long postID, @RequestParam Long userID) {
//        // @ResponseBody means the returned String is the response, not a view name
//        // @RequestParam means it is a parameter from the GET or POST request
//        Post post = pservice.findByPostId(postID);
//        return post.isUserLike(userID);
//    }
}
