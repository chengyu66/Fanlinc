//package com.fanlinc.fanlinc.fan;
//
//import com.fanlinc.fanlinc.fandom.Fandom;
//import com.fanlinc.fanlinc.user.User;
//
//import javax.persistence.EmbeddedId;
//import javax.persistence.Entity;
//import javax.persistence.ManyToOne;
//import javax.persistence.JoinColumn;
//import javax.persistence.MapsId;
//
//@Entity
//class Fan {
//
//    @EmbeddedId
//    FanID id;
//
//    @ManyToOne
//    @MapsId("user_id")
//    @JoinColumn(name = "user_id")
//    User student;
//
//    @ManyToOne
//    @MapsId("fandom_id")
//    @JoinColumn(name = "fandom_id")
//    Fandom course;
//
//    Long FanID;
//
//    // standard constructors, getters, and setters
//
//    public Fan(Long fandomId, Long userId) {
//        this.fandomName = fandomName;
//        this.fandomOwnerId = fandomOwnerId;
//    }
//}
