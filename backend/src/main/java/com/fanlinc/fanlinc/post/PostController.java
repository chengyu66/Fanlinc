package com.fanlinc.fanlinc.post;

import java.util.List;

import com.fanlinc.fanlinc.user.User;
import org.springframework.web.bind.annotation.*;

import com.fanlinc.fanlinc.fandom.FandomService;
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
    @GetMapping(path = "/findPostByPostId") // Map ONLY POST Requests
    @ResponseBody
    public Post findPostByPostId(@RequestParam Long id) {
    	return pservice.findByPostId(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findPostByUserEmail") // Map ONLY POST Requests
    @ResponseBody
    public List<Post> findPostByUserEmail(@RequestParam String email) {
    	return pservice.findByEmail(email);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path = "/findPostByFandomId") // Map ONLY POST Requests
    @ResponseBody
    public List<Post> findPostByFandomId(@RequestParam Long id) {
    	return pservice.findByFandomId(id);
    }


    @CrossOrigin(origins = "*")
    @PostMapping(path = "/userLike") // Map ONLY POST Requests
    @ResponseBody
    public int userLike (@RequestParam Long postID, @RequestParam String email) {
        System.out.println(postID);
        Post post = pservice.findByPostId(postID);
        System.out.println(post);
        User user = service.findByEmail(email);
        System.out.println(user);
        post.setLike(user);
        user.setLiked(post);
        pservice.save(post);
        return post.getLikeNum();
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
