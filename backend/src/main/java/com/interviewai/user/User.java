package com.interviewai.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Long userId;
    private String username;
    private String email;
    private String rank = "unranked";

    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    @Override
    public String toString() {
        return String.format(
                "Customer[id=%d, username='%s', email='%s', rank='%s']",
                userId, username, email, rank
        );
    }

    public Long getId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String email() {
        return email;
    }

    public void setUsername(String newUsername) {
        username = newUsername;
    }

    public void setEmail(String newEmail) {
        email = newEmail;
    }
}
