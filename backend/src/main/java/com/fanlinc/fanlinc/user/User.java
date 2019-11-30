package com.fanlinc.fanlinc.user;

import com.fanlinc.fanlinc.Event.Event;
import com.fanlinc.fanlinc.fandom.Fandom;
//import com.fanlinc.fanlinc.post.Post;
import com.fanlinc.fanlinc.fandomUser.FandomUser;
import com.fanlinc.fanlinc.post.Post;
import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
@Entity(name = "Users") // This tells Hibernate to make a table out of this class
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @JsonProperty("email")
    private String email;

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

    @JsonProperty("password")
    private String password;

    @JsonProperty("profile_pic")
    private String profile_pic = "default_profile_picture";

    String description;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonIgnoreProperties({"user"})
    private Set<FandomUser> fandomUsers = new HashSet<>();

    public void setFandomUsers (FandomUser newFu){
        this.fandomUsers.add(newFu);
    }
    public Set<FandomUser> getFandomUsers() { return this.fandomUsers; }

    public void removeFandomUser(FandomUser fu) {this.fandomUsers.remove(fu); }

//    @JsonIgnore
//    @ManyToMany(fetch = FetchType.EAGER,
//            cascade = {
//                    //CascadeType.PERSIST,
//                    // CascadeType.MERGE //was casuing the multiple entities error
//            },
//            mappedBy = "users")
//    private Set<Fandom> fandoms = new HashSet<>();

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                    //CascadeType.PERSIST,
                    // CascadeType.MERGE //was casuing the multiple entities error
            },
            mappedBy = "liked")
    @JsonIgnoreProperties("liked")
    private Set<Post> likes = new HashSet<>();

    // event and users
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                    //CascadeType.PERSIST,
                    // CascadeType.MERGE //was casuing the multiple entities error
            },
            mappedBy = "participants")
    private Set<Event> events = new HashSet<>();


    public User(String firstName, String lastName, String email, String password, String description, String profile_pic) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
        this.email = email;
        this.password = password;
        this.profile_pic = profile_pic;
    }

    public User() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public Set<Event> getEvent() {
        return this.events;
    }

    public void setEvent(Event event) {
        this.events.add(event);
    }
    public void removeEvent(Event event) {
        this.events.remove(event);
    }

//    public Set<Fandom> getFandoms() {
//        return this.fandoms;
//    }
//
//    public void setFandoms(Fandom fandom) {
//        this.fandoms.add(fandom);
//    }
//
//    public void removeFandom(Fandom fandom) {
//        this.fandoms.remove(fandom);
//    }

    public Set<Post> getLike() {
        return this.likes;
    }

    public void setLiked(Post post) {
        this.likes.add(post);
    }
    public void removeLiked(Post post) {
        this.likes.remove(post);
    }

    public void setProfile_pic(String profile_pic){
        this.profile_pic = profile_pic;
    }
    public String getProfile_pic(){
        return profile_pic;
    }
}