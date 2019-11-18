package com.fanlinc.fanlinc.comment;

import com.fanlinc.fanlinc.post.Post;
import com.fanlinc.fanlinc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Comments")
public class Comment {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long commentId;

    @JsonProperty("content")
    private String content;

    @JsonProperty("email")
    private String email;

    @JsonProperty("post_id")
    private Long post_id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Post post;

    public Comment(String content, Long post_id, String email ) {
        this.content = content;
        this.email = email;
        this.post_id = post_id;
    }
    public Comment(){
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(long commentId) { this.commentId = commentId; }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPost_id(){return post_id;}

    public void setPost(Long post_id){
        this.post_id = post_id;
    }

    public Post getPost(){
        return this.post;
    }

    public void setPost(Post post){
        this.post = post;
    }

}
