package com.fanlinc.fanlinc.fandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Fandom findByFandomNameAndFandomOwnerId(String fandomName, Long fandomOwnerId) {
        Fandom fandom = fandomRepository.findByFandomNameAndFandomOwnerId(fandomName, fandomOwnerId);
        return fandom;
    }
    public Optional<Fandom> findById(Long id){
        return fandomRepository.findById(id);
    }
    public Fandom getFandom(Long id){
        return fandomRepository.findByFandomId(id);
    }
}