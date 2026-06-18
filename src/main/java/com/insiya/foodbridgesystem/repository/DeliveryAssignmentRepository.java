package com.insiya.foodbridgesystem.repository;

import com.insiya.foodbridgesystem.entity.DeliveryAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryAssignmentRepository
        extends JpaRepository<DeliveryAssignment, Long> {
}