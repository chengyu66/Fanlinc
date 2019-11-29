package com.fanlinc.fanlinc.fandomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.util.List;

@Service
public class fandomUserService {

    @Autowired
    private final fandomUserRepository fandomUserRepository;

    public fandomUserService(fandomUserRepository repo) {
        this.fandomUserRepository = repo;
    }

    public FandomUser save(FandomUser fandomUser) {
        fandomUserRepository.save(fandomUser);
        return fandomUser;
    }

    public FandomUser findByFidAndUid(Long fid, Long uid){
        return fandomUserRepository.findByFandomFandomIdAndUserId(fid, uid);
    }

    List<FandomUser> findListOfFandomsByUserId(Long uid){
        return fandomUserRepository.findByUserId(uid);
    }

    public void deleteByFandomNameAndEmail(FandomUser fu){
        fandomUserRepository.delete(fu);
    }

}
