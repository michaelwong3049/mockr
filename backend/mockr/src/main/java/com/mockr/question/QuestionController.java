package com.mockr.question;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping(path="api/question")
public class QuestionController {
    
    private final QuestionService questionService;

    QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }   

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) throws Exception {
        try {
            Optional<Question> questionOpt = questionService.getQuestion(id);
            if(questionOpt.isPresent()) {
                return ResponseEntity
                    .status(HttpStatus.OK) 
                    .body(questionOpt.get());
            } 
            else {
                throw new Exception("questionOpt is NOT present");
            }
        } catch (Exception exception) {
            throw new Exception("Error getting question in QuestionController");
        }
    }

    @GetMapping
    public ResponseEntity<List<Question>> getQuestions() throws Exception {
        try {
            List<Question> questionOpt = questionService.getQuestions();
            for(Question question : questionOpt) {
                System.out.println(question.getQuestion());
                System.out.println(question.getDifficulty());
                System.out.println(question.getConstraints());
            }
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(questionOpt);
        } catch (Exception exception) {
            throw new Exception("Error getting all of the questions");
        }
    }
    
    @PostMapping()
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) throws Exception {
        try {
            Question questionOpt = questionService.createQuestion(question);
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(questionOpt);
        } catch (Exception exception) {
            throw new Exception("Error creating question in QuestionController");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) throws Exception {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity
                .status(204)
                .body("Successfully deleted: " + id);
        } catch (Exception exception) {
            throw new Exception("Error deleteing question in QuestionController");
        }
    }
}