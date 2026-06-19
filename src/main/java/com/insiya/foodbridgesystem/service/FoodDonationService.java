package com.insiya.foodbridgesystem.service;

import com.insiya.foodbridgesystem.entity.FoodDonation;
import com.insiya.foodbridgesystem.repository.FoodDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.insiya.foodbridgesystem.dto.DashboardStats;
import com.insiya.foodbridgesystem.repository.UserRepository;
import java.util.List;
import java.util.Collections;
import com.insiya.foodbridgesystem.entity.User;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.insiya.foodbridgesystem.service.EmailService;

@Service
public class FoodDonationService {

    @Autowired
    private FoodDonationRepository foodDonationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // ================= CREATE DONATION =================

    public FoodDonation createDonation(FoodDonation donation) {

        donation.setStatus("AVAILABLE");
        donation.setClaimedBy(null);
        donation.setAssignedVolunteer(null);

        return foodDonationRepository.save(donation);
    }

    // ================= GET ALL DONATIONS =================

    public List<FoodDonation> getAllDonations() {
        updateExpiredDonations();

        List<FoodDonation> donations =
                foodDonationRepository.findAll();

        donations.sort((d1, d2) -> {

            if ("AVAILABLE".equals(d1.getStatus()) &&
                    !"AVAILABLE".equals(d2.getStatus())) {
                return -1;
            }

            if (!"AVAILABLE".equals(d1.getStatus()) &&
                    "AVAILABLE".equals(d2.getStatus())) {
                return 1;
            }

            return 0;
        });

        return donations;
    }

    // ================= GET DONATION BY ID =================

    public FoodDonation getDonationById(Long id) {
        return foodDonationRepository.findById(id).orElse(null);
    }

    // ================= UPDATE DONATION =================

    public FoodDonation updateDonation(Long id, FoodDonation updatedDonation) {

        FoodDonation existingDonation =
                foodDonationRepository.findById(id).orElse(null);

        if (existingDonation == null) {
            return null;
        }

        existingDonation.setFoodName(updatedDonation.getFoodName());
        existingDonation.setQuantity(updatedDonation.getQuantity());
        existingDonation.setCategory(updatedDonation.getCategory());
        existingDonation.setPickupAddress(updatedDonation.getPickupAddress());
        existingDonation.setExpiryTime(updatedDonation.getExpiryTime());
        existingDonation.setDescription(updatedDonation.getDescription());
        existingDonation.setDonorName(updatedDonation.getDonorName());
        existingDonation.setContactNumber(updatedDonation.getContactNumber());

        existingDonation.setStatus(updatedDonation.getStatus());
        existingDonation.setClaimedBy(updatedDonation.getClaimedBy());
        existingDonation.setAssignedVolunteer(updatedDonation.getAssignedVolunteer());

        return foodDonationRepository.save(existingDonation);
    }

    // ================= CLAIM DONATION =================

    public FoodDonation claimDonation(Long id, String claimedBy) {

        FoodDonation donation =
                foodDonationRepository.findById(id).orElse(null);

        if (donation == null) {
            return null;
        }
        if ("EXPIRED".equals(
                donation.getStatus())) {

            return null;
        }

        User ngo = userRepository.findByName(claimedBy);

        donation.setStatus("CLAIMED");
        donation.setClaimedBy(claimedBy);

        if (ngo != null) {
            donation.setNgoAddress(ngo.getAddress());
        }

        FoodDonation savedDonation =
                foodDonationRepository.save(donation);

        if (donation.getDonorEmail() != null &&
                !donation.getDonorEmail().isEmpty()) {

            emailService.sendEmail(
                    donation.getDonorEmail(),
                    "FoodBridge Donation Claimed",
                    "Hello " + donation.getDonorName() +
                            ",\n\nYour donation \"" +
                            donation.getFoodName() +
                            "\" has been claimed by " +
                            claimedBy +
                            ".\n\nThank you for helping reduce food waste!"
            );
        }

        return savedDonation;
    }

    // ================= ASSIGN VOLUNTEER =================

    public FoodDonation assignVolunteer(Long id, String volunteerName) {

        FoodDonation donation =
                foodDonationRepository.findById(id).orElse(null);

        if (donation == null) {
            return null;
        }

        donation.setAssignedVolunteer(volunteerName);
        donation.setStatus("ASSIGNED");

        FoodDonation savedDonation =
                foodDonationRepository.save(donation);

        User volunteer =
                userRepository.findByName(volunteerName);

        if (volunteer != null &&
                volunteer.getEmail() != null) {

            emailService.sendEmail(
                    volunteer.getEmail(),
                    "FoodBridge Delivery Assignment",
                    "Hello " + volunteer.getName() +
                            ",\n\nYou have been assigned a new food delivery." +
                            "\n\nFood: " + donation.getFoodName() +
                            "\nQuantity: " + donation.getQuantity() +
                            "\nDonor: " + donation.getDonorName() +
                            "\nNGO: " + donation.getClaimedBy() +
                            "\n\nPlease login to FoodBridge for details."
            );
        }

        return savedDonation;
    }

    // ================= MARK DELIVERED =================

    public FoodDonation markDelivered(Long id) {

        FoodDonation donation =
                foodDonationRepository.findById(id).orElse(null);

        if (donation == null) {
            return null;
        }

        donation.setStatus("DELIVERED");

        String deliveredTime =
                LocalDateTime.now().format(
                        DateTimeFormatter.ofPattern(
                                "dd MMM yyyy, hh:mm a"
                        )
                );

        donation.setDeliveredAt(deliveredTime);

        FoodDonation savedDonation =
                foodDonationRepository.save(donation);

        // ================= DONOR EMAIL =================

        System.out.println(
                "Donor Email = " +
                        donation.getDonorEmail()
        );

        if (donation.getDonorEmail() != null &&
                !donation.getDonorEmail().isEmpty()) {

            emailService.sendEmail(
                    donation.getDonorEmail(),
                    "FoodBridge Donation Delivered",
                    "Hello " + donation.getDonorName() +
                            ",\n\nYour donation \"" +
                            donation.getFoodName() +
                            "\" has been successfully delivered." +
                            "\n\nThank you for helping reduce food waste!"
            );

            System.out.println(
                    "Donor email sent successfully"
            );
        }

        // ================= NGO EMAIL =================

        System.out.println(
                "NGO Name = " +
                        donation.getClaimedBy()
        );

        User ngo =
                userRepository.findByName(
                        donation.getClaimedBy()
                );

        System.out.println(
                "NGO Email = " +
                        (ngo != null
                                ? ngo.getEmail()
                                : "NULL")
        );

        if (ngo != null &&
                ngo.getEmail() != null &&
                !ngo.getEmail().isEmpty()) {

            emailService.sendEmail(
                    ngo.getEmail(),
                    "FoodBridge Delivery Completed",
                    "Hello " + ngo.getName() +
                            ",\n\nThe donation \"" +
                            donation.getFoodName() +
                            "\" has been delivered successfully." +
                            "\n\nThank you for serving the community."
            );

            System.out.println(
                    "NGO email sent successfully"
            );
        }

        return savedDonation;
    }
    // ================= DELETE DONATION =================

    public void deleteDonation(Long id) {
        foodDonationRepository.deleteById(id);
    }

    public List<FoodDonation> getVolunteerDeliveries(String volunteerName) {
        return foodDonationRepository.findByAssignedVolunteer(volunteerName);
    }

    public List<FoodDonation> getDonationsByDonor(String donorEmail) {
        return foodDonationRepository.findByDonorEmail(donorEmail);
    }

    public List<FoodDonation> getClaimedDonations(String ngoName) {

        return foodDonationRepository.findByClaimedBy(ngoName);

    }

    public long getTotalDonations() {
        return foodDonationRepository.count();
    }

    public DashboardStats getDashboardStats() {

        long donations = foodDonationRepository.count();

        long ngos = userRepository.countByRole("NGO");

        long volunteers = userRepository.countByRole("VOLUNTEER");

        long meals = foodDonationRepository.getTotalMeals();

        return new DashboardStats(
                donations,
                ngos,
                volunteers,
                meals
        );
    }

    public List<FoodDonation> getRecentDonations() {

        List<FoodDonation> donations =
                foodDonationRepository.findAll();

        Collections.reverse(donations);

        return donations.stream()
                .limit(5)
                .toList();
    }

    public void updateExpiredDonations() {

        List<FoodDonation> donations =
                foodDonationRepository.findAll();

        LocalDateTime now =
                LocalDateTime.now();

        for (FoodDonation donation : donations) {

            if ("AVAILABLE".equals(
                    donation.getStatus())) {

                LocalDateTime expiryTime =
                        LocalDateTime.parse(
                                donation.getExpiryTime()
                        );

                if (expiryTime.isBefore(now)) {

                    donation.setStatus(
                            "EXPIRED"
                    );

                    foodDonationRepository
                            .save(donation);
                }
            }
        }
    }
}