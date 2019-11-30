package com.fanlinc.fanlinc.fandomUser;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.user.User;
import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
@Entity(name = "fu")
public class FandomUser {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
//    @JsonIgnoreProperties({"fandomUsers"})
//    @JsonManagedReference
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
//    @JsonIgnoreProperties({"fandomUsers"})
    private Fandom fandom;

    // additional fields
    private String level;
//
//    public void setId(long id) {
//        this.id = id;
//    }
//
//
    public FandomUser(User user, Fandom fandom, String level){
        this.user = user;
        this.fandom = fandom;
        this.level = level;
    }
    public FandomUser(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLevel(){return level;}

    public void setLevel(String level){this.level = level;}

    public Fandom getFandom(){return fandom;}

}
