package com.fanlinc.fanlinc.comment;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    List<Comment> findByPostidOrderByDateDesc(Long post_id);

}
