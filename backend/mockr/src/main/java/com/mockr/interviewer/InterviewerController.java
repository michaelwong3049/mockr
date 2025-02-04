package com.mockr.interviewer;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path="api/interviewer")
public class InterviewerController {

    private final InterviewerService interviewerService;

    @Autowired
    InterviewerController(InterviewerService interviewerService) {
        this.interviewerService = interviewerService;
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public Interviewer getInterviewer(@PathVariable String id) throws Exception {
        Optional<Interviewer> interviewerOpt = interviewerService.getInterviewer(id);
        if(interviewerOpt.isPresent()) {
            if(interviewerOpt.get().getUsername() == null) {
                throw new Exception("There is no username attached to this user");
            }
            return interviewerOpt.get();
        } else {
            throw new Exception("This interviewer does not exist.");
        }
    }

    @GetMapping 
    public ResponseEntity<List<Interviewer>> getInterviewers() throws Exception {
        try { 
            List<Interviewer> interviewerOpt = interviewerService.getInterviewers();
            for(Interviewer interviewer : interviewerOpt) {
                System.out.println(interviewer.getId());
                System.out.println(interviewer.getUsername());
                System.out.println(interviewer.getEmail());
            }
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(interviewerOpt);
        } catch (Exception exception) {
            throw new Exception("Error getting all of the interviewers", exception);
        }
    }

    @CrossOrigin
    @PostMapping 
    public Interviewer createInterviewer(@RequestBody Interviewer interviewer) throws Exception {
        try { 
            Interviewer interviewerOpt = interviewerService.createInterviewer(interviewer);
            return interviewerOpt;
        } catch (Exception exception) {
            throw new Exception("Error saving interviewer in InterviewerController");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInterviewer(@PathVariable String id) throws Exception {
        try {
            interviewerService.deleteInterviewer(id);
            return ResponseEntity
                // successful deletion, no response body
                .status(204)
                .body("Successfully deleted" + id);
        } catch (Exception exception) {
            throw new Exception("Error deleteing interviewer in InterviewerController");
        }
    }
}
