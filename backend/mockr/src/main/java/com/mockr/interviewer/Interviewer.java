package com.mockr.interviewer;

import com.mockr.question.Question;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Interviewer {
  @Id
  private String id;
  private String username;
  private String email;
  private String rank = "Unranked";
  @OneToMany(cascade = CascadeType.ALL)
  private List<Question> solvedQuestions = new ArrayList<Question>();

  Interviewer() {}

  Interviewer(String username, String email) {
    this.email = email;
    this.username = username;
  }

  public String getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public String getRank() {
    return rank;
  }

  public List<Question> getSolved() {
    return solvedQuestions;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setRank(String rank) {
    this.rank = rank;
  }

  public void addSolved() {
    solvedQuestions.add(
      new Question("Two Sum", "Arrays and Hashing", "Easy", "None")
    );
  }

} 
