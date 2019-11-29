package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FandomService {

    @Autowired
    private final FandomRepository fandomRepository;

    public FandomService(FandomRepository repo) {
        this.fandomRepository = repo;
    }

    public Fandom save(Fandom fandom) {
        fandomRepository.save(fandom);
        return fandom;
    }
    public Fandom findByFandomName(String fandomName) {
        Fandom fandom = fandomRepository.findByFandomName(fandomName);
        return fandom;
    }

    public List<Fandom> findSimilarFandomByName(String fandomName) {
        List<Fandom> f = fandomRepository.findByFandomNameContainingOrderByNumberDesc(fandomName);
        return f;
    }

    public Fandom findByFandomId(Long id){
        return fandomRepository.findByFandomId(id);
    }
    public Fandom getFandom(Long id){
        return fandomRepository.findByFandomId(id);
    }
}