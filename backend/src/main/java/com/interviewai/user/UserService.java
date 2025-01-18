package com.interviewai.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //get a single user
    public User getSingleUser(Long userId) {
        // get() method could be bad since it could 
        return userRepository.findById(userId).get();
    }

    //get all usersjj
    public Iterable<User> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        return users;
    }

    //create a user
    public void createUser(String username, String email) {
        User user = new User(username, email);
        userRepository.save(user);
    }

    //update a user (depends on what we are doing)

    //delete a user
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}