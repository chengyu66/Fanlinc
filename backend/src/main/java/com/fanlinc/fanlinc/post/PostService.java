package com.fanlinc.fanlinc.post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
	
	@Autowired
    private final PostRepository postRepository;

    public PostService(PostRepository repo) {
        this.postRepository = repo;
    }

    public Post save(Post post) {
        postRepository.save(post);
        return post;
    }
    
    public Post findByPostId(Long id) {
    	return postRepository.findByPostId(id);
    }
    
    public List<Post> findByUserId(Long id){
    	return postRepository.findByUserId(id);
    }
    
    public List<Post> findByUserEmail(String email){
    	return postRepository.findByUserEmail(email);
    }
	
	public List<Post> findByFandomId(Long id){
		return postRepository.findByFandomId(id);
	}

}
