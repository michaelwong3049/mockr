package com.interviewai.interview;

import wence.Entity;
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
    private int user_id;
    private int question_id;
    private String code;
    private int communication;
    private int result;

    Interview() {}

    Interview(Long user_id, Long question_id, String code, int communication, int result) {
        this.user_id = user_id;
        this.question_id = question_id;
        this.code = code;
        this.communication = communication;
        this.result = result;
    }

    Long getId() {
        return id;
    }

    Long getUserId() {
        return user_id;
    }

    Long getQuestionId() {
        return question_id;
    }

    String getCode() {
        return code;
    }

    int getCommunication() {
        return communication;
    }

    int getResult() {
        return result;
    }

    void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    void setQuestionId(Long question_id) {
        this.question_id = question_id;
    }

    void setCode(String code) {
        this.code = code;
    }

    void setCommunication(int communication) {
        this.communication = communication;
    }

    void setResult(int result) {
        this.result = result;
    }

}
