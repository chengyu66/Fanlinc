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
    
    public void deleteByPostId(Long id) {
        postRepository.deleteByPostId(id);
    }

    public Post findByPostId(Long id) {
    	return postRepository.findByPostId(id);
    }

    public List<Post> findByEmail(String email){
    	return postRepository.findByEmail(email);
    }

	public List<Post> findByFandomId(Long id){
		return postRepository.findByFandomId(id);
	}

}
