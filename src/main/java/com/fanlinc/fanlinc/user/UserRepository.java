package com.fanlinc.fanlinc.user;

import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {
//    User findByFirstnameAndLastname(String firstName, String lastName);

    User findByEmailAndPassword(String email, String password);
}

