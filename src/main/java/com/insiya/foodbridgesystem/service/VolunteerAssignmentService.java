package com.insiya.foodbridgesystem.service;

import com.insiya.foodbridgesystem.entity.VolunteerAssignment;
import com.insiya.foodbridgesystem.repository.VolunteerAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VolunteerAssignmentService {

    @Autowired
    private VolunteerAssignmentRepository repository;

    public VolunteerAssignment assign(VolunteerAssignment assignment) {
        assignment.setStatus("ASSIGNED");
        return repository.save(assignment);
    }

    public List<VolunteerAssignment> getAll() {
        return repository.findAll();
    }

    public VolunteerAssignment getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public VolunteerAssignment updateStatus(Long id, VolunteerAssignment updated) {
        VolunteerAssignment assignment = repository.findById(id).orElse(null);

        if (assignment != null) {
            assignment.setStatus(updated.getStatus());
            return repository.save(assignment);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}