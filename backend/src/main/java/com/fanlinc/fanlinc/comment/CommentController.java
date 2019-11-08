package com.fanlinc.fanlinc.comment;

import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.post.Post;
import com.fanlinc.fanlinc.post.PostService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController    // This means that this class is a Controller
@RequestMapping(path="/api/comments")
public class CommentController {
    private final FandomService fservice;
    private final CommentService cservice;
    private final UserService uservice;
    private final PostService pservice;

    public CommentController(FandomService fservice,
                             UserService uservice,
                             CommentService cservice,
                             PostService pservice)  {
        this.cservice = cservice;
        this.fservice = fservice;
        this.uservice = uservice;
        this.pservice = pservice;
    }
    @CrossOrigin(origins ="*")
    @PostMapping(path="/createComment") // Map ONLY POST Requests
    public Comment createNewComment (@RequestBody Comment comment) {
        Long pid = comment.getPost_id();
        Post post = pservice.findByPostId(pid);
        comment.setPost(post);
        post.addComment(comment);
        return cservice.save(comment);
    }

    @CrossOrigin(origins ="*")
    @GetMapping(path="/findByPostId") // Map ONLY GET Requests
    public List<Comment> findCommentByPostId (@RequestParam Long post_id) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        return cservice.findByPostid(post_id);
    }
}

