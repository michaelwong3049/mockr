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
  private String questionType;
  private String difficulty;
  private String constraints;

  Question() {}

  public Question(String question, String questionType, String difficulty, String constraints) {
    this.question = question;
    this.questionType = questionType;
    this.difficulty = difficulty;
    this.constraints = constraints;
  }

  public Long getId() {
    return id;
  }

  public String getQuestion() {
    return question;
  }

  public String getDifficulty() {
    return difficulty;
  }

  public String getConstraints() {
    return constraints;
  }

  public String getQuestionType() {
    return questionType;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public void setQuestionType(String questionType) {
    this.questionType = questionType;
  }

  public void setDifficulty(String difficulty) {
    this.difficulty = difficulty;
  }

  public void setConstraints(String constraints) {
    this.constraints = constraints;
  }

}
