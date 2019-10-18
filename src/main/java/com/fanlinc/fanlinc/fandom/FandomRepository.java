package com.fanlinc.fanlinc.fandom;

import org.springframework.data.repository.CrudRepository;

import com.fanlinc.fanlinc.fandom.Fandom;

import java.util.Optional;

public interface FandomRepository extends CrudRepository<Fandom, Long> {
}
