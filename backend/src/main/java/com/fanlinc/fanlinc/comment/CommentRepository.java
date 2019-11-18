package com.fanlinc.fanlinc.comment;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {
//    @Query("SELECT comment_id, content FROM comments")
//    List<Comment> findCommentByPostId(Long pid);
    //    @Query("SELECT comment_id FROM comment ")
    List<Comment> findByPostid(Long post_id);

}
