package com.mockr.question;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Question {

    @Id
    @SequenceGenerator(
        name = "question_sequence",
        sequenceName = "question_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "question_sequence"
    )
    private Long id;
    private String question;
    private String difficulty;
    private String constraints;

    Question() {}

    Question(String question, String difficulty, String constraints) {
        this.question = question;
        this.difficulty = difficulty;
        this.constraints = constraints;
    }

    Long getId() {
        return id;
    }

    String getQuestion() {
        return question;
    }

    String getDifficulty() {
        return difficulty;
    }

    String getConstraints() {
        return constraints;
    }

    void setQuestion(String question) {
        this.question = question;
    }
    
    void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    void setConstraints(String constraints) {
        this.constraints = constraints;
    }

}