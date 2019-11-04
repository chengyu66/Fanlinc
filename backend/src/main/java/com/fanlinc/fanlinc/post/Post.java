package com.fanlinc.fanlinc.post;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name = "Posts")
public class Post {

	@Id
    @GeneratedValue
	private Long postId;

	@JsonProperty("title")
	private String title;

	@JsonProperty("content")
	private String content;

	@JsonProperty("email")
	private String email;
	
	@JsonProperty("fandomId")
	private Long fandomId;

	public Post(String title, String content, String email, Long fandomId) {
        this.title = title;
        this.content = content;
        this.email = email;
        this.fandomId = fandomId;
    }

	public Long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {this.postId = postId;}

    public String getPostTitle() {
        return title;
    }

    public void setPostTitle(String title) {
        this.title = title;
    }
    
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getEmail() { return email; }

    public void setEmail(String email) {this.email = email;}

    public Long getFandomId() { return fandomId; }

    public void setFandomId(Long fandomId) {this.fandomId = fandomId;}
}
