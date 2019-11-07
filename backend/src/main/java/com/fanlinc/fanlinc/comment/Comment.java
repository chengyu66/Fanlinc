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

    @JsonProperty("ownerId")
    private Long ownerId;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Post post;

    public Comment(String content, Long ownerId) {
        this.content = content;
        this.ownerId = ownerId;
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

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Post getPost(){
        return this.post;
    }

    public void setPost(Post post){
        this.post = post;
    }

}
