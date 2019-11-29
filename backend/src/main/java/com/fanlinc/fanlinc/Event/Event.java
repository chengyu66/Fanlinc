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

    @JsonProperty("fandomId")
    private Long fandomId;

    // longitutede latitude, address
    @JsonProperty("longitude")
    private double longitude;

    @JsonProperty("latitude")
    private double latitude;

    @JsonProperty("address")
    private String address;

    @JsonProperty("placeId")
    private String placeId;

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


    public Event(String description,
                 String ownerEmail,
                 String date,
                 String deadline,
                 String eventName,
                 Long fandomId,
                 double longitude,
                 double latitude,
                 String address,
                 String placeId) {
        this.deadline = deadline;
        this.date = date;
        this.description = description;
        this.ownerEmail = ownerEmail;
        this.eventName = eventName;
        this.fandomId = fandomId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
        this.placeId = placeId;
    }
    public Event(){
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) { this.eventId = eventId; }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) { this.eventName = eventName; }

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
        return fandomId;
    }

    public void setFid(Long pid) {
        this.fandomId = fandomId;
    }

    public Set<User> getParticipants() { return this.participants; }

    public void setParticipants(User newUser) {this.participants.add(newUser); }
    public void removeUser(User user) {this.participants.remove(user); }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }


}
