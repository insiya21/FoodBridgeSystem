package com.insiya.foodbridgesystem.repository;

import com.insiya.foodbridgesystem.entity.FoodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRequestRepository extends JpaRepository<FoodRequest, Long> {
}