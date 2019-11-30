package com.fanlinc.fanlinc.post;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fanlinc.fanlinc.comment.Comment;
import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity(name = "Posts")
public class Post {

	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long postId;

    @JsonProperty("time")
	private String time;

	@JsonProperty("title")
	private String title;

	@JsonProperty("content")
	private String content;

	@JsonProperty("email")
	private String email;

	@JsonProperty("fandomId")
	private Long fandomId;

    @JsonProperty("postPic")
    private String postPic;


    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                    //CascadeType.PERSIST,
                    //CascadeType.MERGE
            })
    @JoinTable(name = "user_post",
            joinColumns = { @JoinColumn(name = "post_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("likes")
    private Set<User> liked = new HashSet<>();


    @OneToMany(fetch = FetchType.EAGER,
            mappedBy="post",
            cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();

	public Post(String title, String content, String email, Long fandomId, String postPic) {
        this.title = title;
        this.content = content;
        this.email = email;
        this.fandomId = fandomId;
        this.postPic = postPic;
    }
    public Post(){
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

    public void setLike(User user) {liked.add(user);}

    public Set<User> getLike() {return liked;}

    public void removeLike(User user) {
        liked.remove(user);
    }
    public Set<Comment> getComment() { return this.comments;}

    public void addComment(Comment comment) {this.comments.add(comment);}

    public void deleteComment(Comment comment) {this.comments.remove(comment);}

    public int getLikeNum() { return liked.size(); }
    
    public void setTime(String time) {
        this.time = time;
    }

    public String getTime(String time) { return time; }

    public String getPostPic(){return postPic;}

    public void setPostPic(String postPic){ this.postPic = postPic;}

    public boolean isUserLike(Long userID) {
	    for(User users:liked) {
	        if(users.getId() == userID) {
	            return true;
            }
        }
	    return false;
	}
}