package com.interviewai.question;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Question {

    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Long questionId;
    private String questionName;
    private String difficulty;
    private String questionType;

    public Question(String questionName, String difficulty, String questionType) {
        this.questionName = questionName;
        this.difficulty = difficulty;
        this.questionType = questionType;
    }

    public String getQuestionName() {
        return questionName; 
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String questionType() {
        return questionType;
    }

}
