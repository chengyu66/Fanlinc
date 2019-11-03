package com.fanlinc.fanlinc.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findByFirstNameAndLastName(String firstName, String lastName);


    List<User> findSimilarByFirstNameAndLastName(String firstName, String lastName);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM Users u WHERE u.email = :email")
    boolean existsByEmail(@Param("email") String email);

    User findByEmailAndPassword(String email, String password);

    //User findByUserId(Long id);

    User findByEmail(String email);
}

