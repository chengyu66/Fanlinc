package com.fanlinc.fanlinc.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository repo) {
        this.commentRepository = repo;
    }

    public Comment save(Comment comment) {
        commentRepository.save(comment);
        return comment;
    }


    public List<Comment> findByPostid(Long post_id) {
        List<Comment> c = commentRepository.findByPostidOrderByDateDesc(post_id);
        return c;
    }

}
