package com.mockr.interviewer;

import com.mockr.question.Question;

import jakarta.persistence.Id;
//import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
//import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Entity;
//import jakarta.persistence.GenerationType;

import java.util.ArrayList;

@Entity
@Table
public class Interviewer {
  @Id
  private String id;
  private String username;
  private String email;
  private String rank = "Unranked";
  private ArrayList<Question> solvedQuestions = new ArrayList<>();

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

  public ArrayList<Question> getSolved() {
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

  public void addSolved(Question solved) {
    solvedQuestions.add(
	new Question("Two Sum", "Arrays and Hashing", "Easy", "None")
    );
  }

} 
