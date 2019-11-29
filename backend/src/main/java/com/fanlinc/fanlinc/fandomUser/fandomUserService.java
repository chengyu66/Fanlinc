package com.fanlinc.fanlinc.fandomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.*;

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

    public void deleteByFandomNameAndEmail(FandomUser fu){
        fandomUserRepository.delete(fu);
    }

}
