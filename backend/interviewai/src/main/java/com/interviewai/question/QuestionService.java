package com.interviewai.question;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    
    @Autowired
    QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Optional<Question> getQuestion(Long id) throws Exception {
        try {
            return questionRepository.findById(id);
        } catch (Exception exception) {
            throw new Exception("Error getting this question");
        }   
    }

    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    public Question createQuestion(Question question) throws Exception {
        try {
            questionRepository.save(question);
            return question;
        } catch (Exception exception) {
            throw new Exception("Error saving question in QuestionService");
        }
    }

    public void deleteQuestion(Long id) throws Exception {
        try {
            questionRepository.deleteById(id);
        } catch (Exception exception) {
            throw new Exception("Error deleting question in QuestionService");
        }
    }

}