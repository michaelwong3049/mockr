package com.interviewai.interviewer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
public class Interviewer {
    @Id
    @SequenceGenerator(
        name = "interviewer_sequence",
        sequenceName = "interviewer_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "interviewer_sequence"

    )
    private Long id;
    private String username;
    private String email;
    private String rank = "Unranked";

    Interviewer() {}

    Interviewer(String username, String email) {
        this.username = username;
        this.email = email;
    }

    Long getId() {
        return id;
    }

    String getUsername() {
        return username;
    }

    String getEmail() {
        return email;
    }

    String getRank() {
        return rank;
    }

    void setUsername(String username) {
        this.username = username;
    }

    void setEmail(String email) {
        this.email = email;
    }

    void setRank(String rank) {
        this.rank = rank;
    }

}