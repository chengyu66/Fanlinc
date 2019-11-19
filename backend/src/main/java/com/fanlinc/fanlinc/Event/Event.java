package com.fanlinc.fanlinc.Event;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.post.Post;
import com.fanlinc.fanlinc.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Events")
public class Event {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long eventId;

    @JsonProperty("description")
    private String description;

    @JsonProperty("ownerEmail")
    private String ownerEmail;

    @JsonProperty("deadline")
    private String deadline;

    @JsonProperty("date")
    private String date;

    @JsonProperty("eventName")
    private String eventName;

    @JsonProperty("fandom_id")
    private Long fandom_id;

    // participants(users and events)
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                    //CascadeType.PERSIST,
                    // CascadeType.MERGE
            })
    @JoinTable(name = "event_user",
            joinColumns = { @JoinColumn(name = "event_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    private Set<User> participants = new HashSet<>();

    // events belong to only one fandom
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Fandom fandom;


    public Event(String description, String ownerEmail, String date, String deadline, String eventName, Long fandom_id) {
        this.deadline = deadline;
        this.date = date;
        this.description = description;
        this.ownerEmail = ownerEmail;
        this.eventName = eventName;
        this.fandom_id = fandom_id;
    }
    public Event(){
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) { this.description = description; }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public Fandom getFandom(){
        return this.fandom;
    }

    public void setFandom(Fandom fandom){
        this.fandom = fandom;
    }

    public Long getFandom_id() {
        return fandom_id;
    }

    public void setFid(Long pid) {
        this.fandom_id = fandom_id;
    }

    public Set<User> getParticipants() { return this.participants; }

    public void setParticipants(User newUser) {this.participants.add(newUser); }
    public void removeUser(User user) {this.participants.remove(user); }

}
