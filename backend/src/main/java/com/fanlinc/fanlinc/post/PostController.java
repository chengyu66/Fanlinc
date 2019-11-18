package com.fanlinc.fanlinc.post;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;

@RestController    // This means that this class is a Controller
@RequestMapping(path = "/api/posts") // This means URL's start with /demo (after Application path)
public class PostController {
	private final UserService service;
    private final FandomService fservice;
    private final PostService pservice;

    public PostController(UserService service, FandomService fservice, PostService pservice) {
        this.service = service;
        this.fservice = fservice;
        this.pservice = pservice;
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/post") // Map ONLY POST Requests
    public Post post (@RequestBody Post post) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        return pservice.save(post);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/edit") // Map ONLY POST Requests
    @ResponseBody
    public void edit (@RequestParam Long id, @RequestParam String title, @RequestParam String content) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        Post post = pservice.findByPostId(id);
        post.setPostTitle(title);
        post.setContent(content);
        
        pservice.save(post);
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findPostByPostId") // Map ONLY GET Requests
    @ResponseBody
    public Post findPostByPostId(@RequestParam Long id) {
    	return pservice.findByPostId(id);
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findPostByUserEmail") // Map ONLY GET Requests
    @ResponseBody
    public List<Post> findPostByUserEmail(@RequestParam String email) {
    	return pservice.findByEmail(email);
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findPostByFandomId") // Map ONLY GET Requests
    @ResponseBody
    public List<Post> findPostByFandomId(@RequestParam Long id) {
    	return pservice.findByFandomId(id);
    }
	
}
