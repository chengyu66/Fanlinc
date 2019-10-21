package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.user.User;
import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty("fandomOwnerId")
    private Long fandomOwnerId;

    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "fandoms")
    private Set<User> users = new HashSet<>();

    public Fandom(String fandomName, Long fandomOwnerId) {
        this.fandomName = fandomName;
        this.fandomOwnerId = fandomOwnerId;
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

    public Long getFandomOwnerId() { return fandomOwnerId; }

    public void setFandomOwnerId(Long fandomOwnerId) {this.fandomOwnerId=fandomOwnerId; }

    public Set<User> getUser() { return this.users; }

    public void setUsers(User newUser) {this.users.add(newUser); }

}
