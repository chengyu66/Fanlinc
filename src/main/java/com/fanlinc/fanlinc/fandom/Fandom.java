package com.fanlinc.fanlinc.fandom;

import javax.persistence.*;

@Entity
public class Fandom {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(name = "fandomId", updatable = false, nullable = false)
    private Integer fandomId;

    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(name = "fandomName", nullable = false)
    private String fandomName;

    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(name = "fandomOwnerId", updatable = false, nullable = false)
    private Integer fandomOwnerId;

    public Integer getFandomIdId() {
        return fandomId;
    }

    public String getFandomNameName() {
        return fandomName;
    }

    public void setFandomName(String fandomName) {
        this.fandomName = fandomName;
    }

    public Integer getFandomOwnerId() {
        return fandomOwnerId;
    }
}
