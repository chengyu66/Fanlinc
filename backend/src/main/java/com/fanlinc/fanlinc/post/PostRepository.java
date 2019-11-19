package com.fanlinc.fanlinc.post;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {
	@Query("select p from Posts p where p.postId = ?1")
	Post findByPostId(Long id);

	@Query("select p from Posts p where p.email = ?1 order by time desc")
	List<Post> findByEmail(String email);

	@Query("select p from Posts p where p.fandomId = ?1 order by time desc")
	List<Post> findByFandomId(Long id);
	
	@Modifying
	@Query("delete from Posts p where p.postId = ?1")
	void deleteByPostId(Long id);

}
