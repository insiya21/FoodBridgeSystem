package com.insiya.foodbridgesystem.controller;

import com.insiya.foodbridgesystem.entity.DeliveryAssignment;
import com.insiya.foodbridgesystem.service.DeliveryAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
@CrossOrigin(origins = "http://localhost:5173")
public class DeliveryAssignmentController {

    @Autowired
    private DeliveryAssignmentService service;

    @PostMapping
    public DeliveryAssignment assignVolunteer(
            @RequestBody DeliveryAssignment assignment
    ) {

        return service.assign(assignment);
    }

    @GetMapping
    public List<DeliveryAssignment> getAllAssignments() {

        return service.getAll();
    }

    @PutMapping("/pickup/{id}")
    public DeliveryAssignment pickup(
            @PathVariable Long id
    ) {

        return service.markPickedUp(id);
    }

    @PutMapping("/deliver/{id}")
    public DeliveryAssignment deliver(
            @PathVariable Long id
    ) {

        return service.markDelivered(id);
    }
}