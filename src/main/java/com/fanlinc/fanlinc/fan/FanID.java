//package com.fanlinc.fanlinc.fan;
//
//import javax.persistence.Column;
//import javax.persistence.Embeddable;
//import java.io.Serializable;
//
//@Embeddable
//public class FanID implements Serializable {
//
//    private Long fandomId;
//    private Long userId;
//
////    @Column(name = "userId")
////    Long userId;
////
////    @Column(name = "fandomId")
////    Long fandomId;
//
//    // standard constructors, getters, and setters
//    // hashcode and equals implementation
//    public FanID(Long fandomId, Long userId) {
//        this.fandomId = fandomId;
//        this.userId = userId;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public Long getFandomId() {
//        return fandomId;
//    }
//
//    public void setFandomId(Long fandomId) {
//        this.fandomId = fandomId;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//
//        FanID that = (FanID) o;
//
//        if (!userId.equals(that.userId)) return false;
//        return fandomId.equals(that.fandomId);
//    }
//}
