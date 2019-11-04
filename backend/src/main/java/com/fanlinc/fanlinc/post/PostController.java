package com.fanlinc.fanlinc.post;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
    @ResponseBody
    public void post (@RequestParam String title, @RequestParam String content, @RequestParam String email, @RequestParam Long fandomId) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        Post post = new Post(title, content, email, fandomId);
        pservice.save(post);
        User user = service.findByEmail(email);
        user.setPosts(post);
        Fandom fandom = fservice.findByFandomId(fandomId);
        fandom.setPosts(post);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/edit") // Map ONLY POST Requests
    @ResponseBody
    public void edit (@RequestParam Long id, @RequestParam String title, @RequestParam String content) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        Post post = pservice.findByPostId(id);
        User user = service.findByEmail(post.getEmail());
        user.removePost(post);
        Fandom fandom = fservice.findByFandomId(post.getFandomId());
        fandom.removePost(post);
        post.setPostTitle(title);
        post.setContent(content);
        user.setPosts(post);
        fandom.setPosts(post);
        
        pservice.save(post);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/delete") // Map ONLY POST Requests
    @ResponseBody
    public void delete (@RequestParam Long id) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        Post post = pservice.findByPostId(id);
        User user = service.findByEmail(post.getEmail());
        user.removePost(post);
        Fandom fandom = fservice.findByFandomId(post.getFandomId());
        fandom.removePost(post);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/findPostByPostId") // Map ONLY POST Requests
    @ResponseBody
    public Post findPostByPostId(@RequestParam Long id) {
    	return pservice.findByPostId(id);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/findPostByUserId") // Map ONLY POST Requests
    @ResponseBody
    public List<Post> findPostByUserId(@RequestParam Long id) {
    	return pservice.findByUserId(id);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/findPostByUserEmail") // Map ONLY POST Requests
    @ResponseBody
    public List<Post> findPostByUserEmail(@RequestParam String email) {
    	return pservice.findByUserEmail(email);
    }
    
    @CrossOrigin(origins = "*")
    @PostMapping(path = "/findPostByFandomId") // Map ONLY POST Requests
    @ResponseBody
    public List<Post> findPostByFandomId(@RequestParam Long id) {
    	return pservice.findByFandomId(id);
    }
	
}
