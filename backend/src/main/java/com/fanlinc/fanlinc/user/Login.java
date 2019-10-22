package com.fanlinc.fanlinc.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


public class Login {


    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    public Login(String email, String password) {
        this.email = email;
        this.password = password;
    }

    private Login() {}



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}