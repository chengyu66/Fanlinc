package com.fanlinc.fanlinc.fandom;

import org.springframework.data.repository.CrudRepository;


public interface FandomRepository extends CrudRepository<Fandom, Long> {
    Fandom findByFandomNameAndFandomOwnerId(String fandomId, Long fandomOwnerId);
    Fandom findByFandomId(Long id);
}
