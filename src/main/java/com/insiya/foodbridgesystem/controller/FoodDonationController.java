package com.insiya.foodbridgesystem.controller;

import com.insiya.foodbridgesystem.entity.FoodDonation;
import com.insiya.foodbridgesystem.service.FoodDonationService;
import com.insiya.foodbridgesystem.dto.DashboardStats;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/donations")
public class FoodDonationController {

    @Autowired
    private FoodDonationService foodDonationService;

    // ================= CREATE DONATION =================

    @PostMapping
    public FoodDonation createDonation(@Valid @RequestBody FoodDonation donation) {
        return foodDonationService.createDonation(donation);
    }

    // ================= GET DASHBOARD STATS =================

    @GetMapping("/stats")
    public DashboardStats getDashboardStats() {
        return foodDonationService.getDashboardStats();
    }

    // ================= GET TOTAL DONATIONS COUNT =================

    @GetMapping("/count")
    public long getTotalDonations() {
        return foodDonationService.getTotalDonations();
    }

    // ================= GET ALL DONATIONS =================

    @GetMapping
    public List<FoodDonation> getAllDonations() {
        return foodDonationService.getAllDonations();
    }

    // ================= GET DONATION BY ID =================

    @GetMapping("/{id:\\d+}")
    public FoodDonation getDonationById(@PathVariable Long id) {
        return foodDonationService.getDonationById(id);
    }

    // ================= UPDATE DONATION =================

    @PutMapping("/{id}")
    public FoodDonation updateDonation(
            @PathVariable Long id,
            @RequestBody FoodDonation donation) {

        return foodDonationService.updateDonation(id, donation);
    }

    // ================= CLAIMED DONATIONS =================

    @GetMapping("/claimed/{ngoName}")
    public List<FoodDonation> getClaimedDonations(
            @PathVariable String ngoName) {

        return foodDonationService.getClaimedDonations(ngoName);
    }

    // ================= ASSIGN VOLUNTEER =================

    @PutMapping("/assign/{id}")
    public FoodDonation assignVolunteer(
            @PathVariable Long id,
            @RequestParam String volunteerName) {

        return foodDonationService.assignVolunteer(id, volunteerName);
    }

    // ================= MARK DELIVERED =================

    @PutMapping("/deliver/{id}")
    public FoodDonation markDelivered(@PathVariable Long id) {

        return foodDonationService.markDelivered(id);
    }

    // ================= DELETE DONATION =================

    @DeleteMapping("/{id}")
    public String deleteDonation(@PathVariable Long id) {

        foodDonationService.deleteDonation(id);

        return "Donation deleted successfully";
    }

    // ================= VOLUNTEER DELIVERIES =================

    @GetMapping("/volunteer/{name}")
    public List<FoodDonation> getVolunteerDeliveries(
            @PathVariable String name) {

        return foodDonationService.getVolunteerDeliveries(name);
    }

    // ================= DONOR DONATIONS =================

    @GetMapping("/donor/{donorName}")
    public List<FoodDonation> getDonationsByDonor(
            @PathVariable String donorName) {

        return foodDonationService.getDonationsByDonor(donorName);
    }

    @GetMapping("/recent")
    public List<FoodDonation> getRecentDonations() {
        return foodDonationService.getRecentDonations();
    }

    // ================= CLAIM DONATION =================

    @PutMapping("/claim/{id}")
    public FoodDonation claimDonation(
            @PathVariable Long id,
            @RequestParam String claimedBy) {

        return foodDonationService.claimDonation(id, claimedBy);
    }
}