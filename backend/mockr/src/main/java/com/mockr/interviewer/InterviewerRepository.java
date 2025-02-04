package com.mockr.interviewer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewerRepository extends JpaRepository<Interviewer, String> {
  //@Query("select i from Interviewer i where i.userId = ?userId")
  //Interviewer findByUserId(String userId);
}

