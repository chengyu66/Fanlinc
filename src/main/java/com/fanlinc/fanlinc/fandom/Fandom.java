package com.fanlinc.fanlinc.fandom;

import javax.persistence.*;

@Entity
@Table(name = "Fandom")
public class Fandom {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(name = "fandomId", updatable = false, nullable = false)
    private Long fandomId;

    @Column(name = "fandomName", nullable = false)
    private String fandomName;

    @Column(name = "fandomOwnerId", updatable = false, nullable = false)
    private Long fandomOwnerId;

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
}
