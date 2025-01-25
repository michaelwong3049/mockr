package com.interviewai.interview;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;

    @Autowired
    public InterviewService(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    public Optional<Interview> getInterview(Long id) {
        return interviewRepository.findById(id);
    }

    public List<Interview> getInterviews() {
        return interviewRepository.findAll();
    }

    public Interview createInterview(Interview interview) {
        interviewRepository.save(interview);
        return interview;
    }

    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }
    
}
