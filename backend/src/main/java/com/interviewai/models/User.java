package com.interviewai.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
class User {

    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String username;
    private String email;
    private String rank = "unranked";

    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public Long getId() {
        return id;
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
