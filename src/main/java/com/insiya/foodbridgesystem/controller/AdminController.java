package com.insiya.foodbridgesystem.controller;
import com.insiya.foodbridgesystem.service.EmailService;
import com.insiya.foodbridgesystem.entity.User;
import com.insiya.foodbridgesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping("/pending-ngos")
    public List<User> getPendingNgos() {

        return userRepository.findByRoleAndApprovalStatus(
                "NGO",
                "PENDING"
        );
    }

    @PutMapping("/approve/{id}")
    public User approveNgo(
            @PathVariable Long id) {

        User user =
                userRepository.findById(id)
                        .orElse(null);

        if (user == null) {
            return null;
        }

        user.setApprovalStatus("APPROVED");

        userRepository.save(user);

        System.out.println("About to send email to: " + user.getEmail());

        emailService.sendEmail(
                user.getEmail(),
                "FoodBridge NGO Approval",
                "Congratulations " + user.getName()
        );

        System.out.println("Email sent successfully");

        return user;
    }

    @PutMapping("/reject/{id}")
    public User rejectNgo(
            @PathVariable Long id) {

        User user =
                userRepository.findById(id)
                        .orElse(null);

        if (user == null) {
            return null;
        }

        user.setApprovalStatus("REJECTED");

        userRepository.save(user);

        emailService.sendEmail(
                user.getEmail(),
                "FoodBridge NGO Verification",
                "Hello " + user.getName() +
                        ",\n\nWe are sorry to inform you that your NGO verification request has been rejected."
        );

        return user;
    }
}