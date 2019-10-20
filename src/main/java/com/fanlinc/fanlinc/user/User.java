package com.fanlinc.fanlinc.user;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "User") // This tells Hibernate to make a table out of this class
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

    String description;


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "user_fandom",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "fandom_id") })
    private Set<Fandom> fandoms = new HashSet<>();
    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = "";
        this.email = email;
        this.password = password;
    }
    // join fandom
    public User(String firstName, String lastName, String email, String password, Fandom fandom) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = "";
        this.email = email;
        this.password = password;
        this.setFandoms(fandom);
        fandom.getUser().add(this);
    }


    private User() {}


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
    public Set<Fandom> getFandoms() {
        return this.fandoms;
    }

    public void setFandoms(Fandom fandom) {
        this.fandoms.add(fandom);
    }
}