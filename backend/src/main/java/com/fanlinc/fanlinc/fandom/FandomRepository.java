package com.fanlinc.fanlinc.fandom;

import com.fanlinc.fanlinc.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface FandomRepository extends CrudRepository<Fandom, Long> {
    Fandom findByFandomName(String fandomId);
    Fandom findByFandomId(Long id);
//    @Query("SELECT fandom_id, fandom_name FROM fandoms")
//    List<Fandom> findSimilarFandomByName(String fandomName);
    List<Fandom> findByFandomNameContainingOrderByNumberDesc(String fandomName);
}
