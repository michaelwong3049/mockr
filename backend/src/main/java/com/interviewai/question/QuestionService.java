package com.interviewai.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // get a single question using the question name; might have to make custom query 
    // public Question getSingleQuestion(String questionName) {

    // }

    // get all questions 
    public Iterable<Question> getAllQuestions() {
        Iterable<Question> questions = questionRepository.findAll();
        return questions;
    }

    // create a question
    public void createQuestion(String questionName, String difficulty, String questionType){ 
        Question question = new Question(questionName, difficulty, questionType);
        questionRepository.save(question);
    }

    // update a question and delete question both might require custom queries
}
