package com.insiya.foodbridgesystem.service;

import com.insiya.foodbridgesystem.entity.DeliveryAssignment;
import com.insiya.foodbridgesystem.repository.DeliveryAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryAssignmentService {

    @Autowired
    private DeliveryAssignmentRepository repository;

    public DeliveryAssignment assign(
            DeliveryAssignment assignment
    ) {

        assignment.setStatus("ASSIGNED");

        return repository.save(assignment);
    }

    public List<DeliveryAssignment> getAll() {
        return repository.findAll();
    }

    public DeliveryAssignment markPickedUp(Long id) {

        DeliveryAssignment assignment =
                repository.findById(id).orElse(null);

        if (assignment == null) {
            return null;
        }

        assignment.setStatus("PICKED_UP");

        return repository.save(assignment);
    }

    public DeliveryAssignment markDelivered(Long id) {

        DeliveryAssignment assignment =
                repository.findById(id).orElse(null);

        if (assignment == null) {
            return null;
        }

        assignment.setStatus("DELIVERED");

        return repository.save(assignment);
    }
}