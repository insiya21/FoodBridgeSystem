package com.insiya.foodbridgesystem.controller;

import com.insiya.foodbridgesystem.entity.VolunteerAssignment;
import com.insiya.foodbridgesystem.service.VolunteerAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class VolunteerAssignmentController {

    @Autowired
    private VolunteerAssignmentService service;

    @PostMapping
    public VolunteerAssignment assign(@RequestBody VolunteerAssignment assignment) {
        return service.assign(assignment);
    }

    @GetMapping
    public List<VolunteerAssignment> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public VolunteerAssignment getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public VolunteerAssignment updateStatus(@PathVariable Long id,
                                            @RequestBody VolunteerAssignment assignment) {
        return service.updateStatus(id, assignment);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Volunteer Assignment deleted successfully!";
    }
}