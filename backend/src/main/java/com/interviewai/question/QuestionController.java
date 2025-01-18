package com.interviewai.question;

import com.interviewai.question.Question;
import com.interviewai.question.QuestionService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class QuestionController {
    
    @Autowired
    private QuestionService questionService;
    
    // getting a single question
    // @GetMapping("/question/{question_name}")
    // public String getMethodName(@RequestParam String questionName) {
    //     return questionService.getQuestionName();
    // }
    
    @PostMapping("/addQuestion")
    public void createQuestion(@RequestBody String questionName, String difficulty, String questionType) {-
        questionService.createQuestion(questionName, difficulty, questionType);
    }

    // delete and update are gonna take custom queries that ill have to learn

}
