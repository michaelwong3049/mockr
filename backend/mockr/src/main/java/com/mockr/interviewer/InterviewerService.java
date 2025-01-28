package com.mockr.interviewer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InterviewerService {

    private final InterviewerRepository interviewerRepository;

    @Autowired
    public InterviewerService(InterviewerRepository interviewerRepository) {
        this.interviewerRepository = interviewerRepository;
    }

    public Optional<Interviewer> getInterviewer(Long id) {
        try {
            return interviewerRepository.findById(id);
        } catch (Exception exception){
            throw exception;
        }
    }

    public List<Interviewer> getInterviewers() {
        return interviewerRepository.findAll();
    }

    public Interviewer createInterviewer(Interviewer interviewer) throws Exception {
        try {
            interviewerRepository.save(interviewer);
            return interviewer;
        } catch (Exception exception) {
            throw new Exception("Error saving interviewer in InterviewerService");
        }
    }

    public void deleteInterviewer(Long id) throws Exception {
        try {
            interviewerRepository.deleteById(id);
        } catch (Exception exception) {
            throw new Exception("Error deleting interviewer in InterviewerService");
        }
    }

}
