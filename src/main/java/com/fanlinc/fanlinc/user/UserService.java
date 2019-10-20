package com.fanlinc.fanlinc.user;

import com.fanlinc.fanlinc.fandom.Fandom;
import com.fanlinc.fanlinc.fandom.FandomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final FandomRepository fandomRepository;

    public UserService(UserRepository repo, FandomRepository fandomRepository) {
        this.fandomRepository = fandomRepository;
        this.userRepository = repo;
    }

    public User save(User user) {
        userRepository.save(user);
        return user;
    }

    public User findByEmailAndPassword(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        return user;
    }

//    public User findByUserId(Long id){
//        User user = userRepository.findByUserId(id);
//        return user;
//    }
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findByFirstNameAndLastName(String firstName, String lastName) {
        return userRepository.findByFirstNameAndLastName(firstName, lastName);
    }
}
