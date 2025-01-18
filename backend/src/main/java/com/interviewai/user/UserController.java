package com.interviewai.user;

import com.interviewai.user.User;
import com.interviewai.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") Long userId) {
        return userService.getSingleUser(userId);
    }

    @PostMapping("/addUser")
    public void createUser(String name, String email) {
        userService.createUser(name, email);
    }

    // @PutMappin
    // public void updateUser(Long id, other_specific_names)

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
    }
}