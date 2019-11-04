package com.fanlinc.fanlinc.post;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {
	Post findByPostId(Long id);
	
	List<Post> findByEmail(String email);
	
	List<Post> findByFandomId(Long id);

}
