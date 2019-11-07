package com.fanlinc.fanlinc.comment;

import com.fanlinc.fanlinc.fandom.FandomService;
import com.fanlinc.fanlinc.post.Post;
import com.fanlinc.fanlinc.post.PostService;
import com.fanlinc.fanlinc.user.User;
import com.fanlinc.fanlinc.user.UserService;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(path="/createComment") // Map ONLY POST Requests
    public Comment createNewComment (@RequestParam String content, @RequestParam String email, @RequestParam Long pid) {
        User user = uservice.findByEmail(email);
        Long ownerId = user.getId();
        Post post = pservice.findByPostId(pid);
        Comment comment = new Comment(content, ownerId);
        comment.setPost(post);
        //post.addComment(comment);
        return cservice.save(comment);
    }

}

