package com.fanlinc.fanlinc.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository repo) {
        this.userRepository = repo;
    }

    public User save(User user) {
        userRepository.save(user);
        return user;
    }

    public List<User> findAll() {

        Iterable<User> it = userRepository.findAll();

        ArrayList users = new ArrayList<User>();
        it.forEach(users::add);

        return users;
    }
}
