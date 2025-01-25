package com.interviewai.interview;

import java.util.List;
import java.util.Optional;

import org.aspectj.internal.lang.annotation.ajcDeclareAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping(path="api/interview")
public class InterviewController {
    
    private final InterviewService interviewService;

    @Autowired
    InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterview(@PathVariable Long id) throws Exception {
        Optional<Interview> interviewOpt = interviewService.getInterview(id);
        if(interviewOpt.isPresent()) {
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(interviewOpt.get());
        } else {
            throw new Exception("This interview does not exist.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Interview>> getInterviews() throws Exception {
        try {
            List<Interview> interviewOpt = interviewService.getInterviews();
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(interviewOpt);
        } catch (Exception exception) {
            throw new Exception("Error getting all of the interviews", exception);
        }
    }

    @PostMapping 
    public ResponseEntity<Interview> createInterview(@RequestBody Interview interview) throws Exception {
        try {
            Interview interviewOpt = interviewService.createInterview(interview);
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(interviewOpt);
        } catch (Exception exception) {
            throw new Exception("Error creating interview", exception);
        }
    }   

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInterview(@PathVariable Long id) throws Exception {
        try {
            interviewService.deleteInterview(id);
            return ResponseEntity
                .status(HttpStatus.OK)
                .body("Successfully deleted" +id);
        } catch (Exception exception) {
            throw new Exception("Error deleting interview in InterviewerController");
        }
    }

}
