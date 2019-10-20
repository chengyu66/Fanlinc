package com.fanlinc.fanlinc.user;

import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findByFirstNameAndLastName(String firstName, String lastName);

    User findByEmailAndPassword(String email, String password);
    //User findByUserId(Long id);

    User findByEmail(String email);
}

