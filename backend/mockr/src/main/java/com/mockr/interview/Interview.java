package com.mockr.interview;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
public class Interview {
    @Id
    @SequenceGenerator(
        name = "interview_sequence",
        sequenceName = "interview_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "interview_sequence"
    )

    private Long id; 
    private String userId;
    private String question;
    private String code;
    private String communication;
    private String result;

    Interview() {}

    Interview(String userId, String question, String code, String communication, String result) {
        this.userId = userId;
        this.question = question;
        this.code = code;
        this.communication = communication;
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getQuestion() {
        return question;
    }

    public String getCode() {
        return code;
    }

    public String getCommunication() {
        return communication;
    }

    public String getResult() {
        return result;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setCommunication(String communication) {
        this.communication = communication;
    }

    public void setResult(String result) {
        this.result = result;
    }

}
