package com.insiya.foodbridgesystem.repository;

import com.insiya.foodbridgesystem.entity.FoodDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface FoodDonationRepository extends JpaRepository<FoodDonation, Long> {

    List<FoodDonation> findByStatus(String status);

    List<FoodDonation> findByAssignedVolunteer(String assignedVolunteer);

    List<FoodDonation> findByDonorName(String donorName);

    List<FoodDonation> findByClaimedBy(String claimedBy);

    @Query("SELECT COALESCE(SUM(f.quantity),0) FROM FoodDonation f")
    Long getTotalMeals();
}

