package com.insiya.foodbridgesystem.repository;

import com.insiya.foodbridgesystem.entity.VolunteerAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerAssignmentRepository extends JpaRepository<VolunteerAssignment, Long> {
}