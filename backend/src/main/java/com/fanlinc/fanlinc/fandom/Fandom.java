package com.fanlinc.fanlinc.fandom;

//import com.fanlinc.fanlinc.post.Post;
import com.fanlinc.fanlinc.fandomUser.FandomUser;
import com.fanlinc.fanlinc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Fandoms")
public class Fandom {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long fandomId;

    @JsonProperty("fandomName")
    private String fandomName;


    @JsonProperty("ownerEmail")
    private String ownerEmail;

    @JsonProperty("number")
    private int number;

    @JsonProperty("fandom_pic")
    private String fandom_pic = "default_fandom_picture";

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                    //CascadeType.PERSIST,
                    // CascadeType.MERGE
            })
    @JoinTable(name = "fandom_user",
            joinColumns = { @JoinColumn(name = "fandom_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "fandom", cascade = CascadeType.ALL)
    private Set<FandomUser> fandomUsers = new HashSet<>();

    public void setFandomUsers (FandomUser newFu){
        this.fandomUsers.add(newFu);
        this.number = fandomUsers.size();
    }
    public Set<FandomUser> getFandomUsers() { return this.fandomUsers; }

    public void removeFandomUser(FandomUser fu) {
        this.fandomUsers.remove(fu);
        this.number = fandomUsers.size();
    }

    public Fandom(String fandomName, String ownerEmail) {
        this.fandomName = fandomName;
        this.ownerEmail = ownerEmail;
        this.number = 0;
    }
    public Fandom(){

    }

    public Long getFandomId() {
        return fandomId;
    }

    public void setFandomId(long fandomId) { this.fandomId = fandomId; }

    public String getFandomName() {
        return fandomName;
    }

    public void setFandomName(String fandomName) {
        this.fandomName = fandomName;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public Set<User> getUser() { return this.users; }

    public void setUsers(User newUser) {this.users.add(newUser); }

    public void removeUser(User user) {this.users.remove(user); }

    public void setFandom_pic(String fandom_pic){this.fandom_pic=fandom_pic;}
    public String getFandom_pic(){return this.fandom_pic;}
}
