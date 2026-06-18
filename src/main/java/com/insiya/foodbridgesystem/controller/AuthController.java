package com.insiya.foodbridgesystem.controller;

import com.insiya.foodbridgesystem.dto.LoginRequest;
import com.insiya.foodbridgesystem.entity.User;
import com.insiya.foodbridgesystem.repository.UserRepository;
import com.insiya.foodbridgesystem.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Optional;
import com.insiya.foodbridgesystem.dto.LoginResponse;
import java.util.Random;
import com.insiya.foodbridgesystem.service.EmailService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user != null &&
                passwordEncoder.matches(
                        loginRequest.getPassword(),
                        user.getPassword()))  {

            if ("NGO".equalsIgnoreCase(user.getRole())) {

                if ("PENDING".equalsIgnoreCase(
                        user.getApprovalStatus())) {

                    throw new RuntimeException(
                            "Your NGO account is waiting for admin approval"
                    );
                }

                if ("REJECTED".equalsIgnoreCase(
                        user.getApprovalStatus())) {

                    throw new RuntimeException(
                            "Your NGO account has been rejected"
                    );
                }
            }

            String token = jwtUtil.generateToken(user.getEmail());
            System.out.println("Login Successful");
            System.out.println("Token: " + token);
            System.out.println("Role: " + user.getRole());
            System.out.println("Name: " + user.getName());
            System.out.println("Address from DB = " + user.getAddress());
            return new LoginResponse(
                    token,
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getAddress()
            );
        }

        throw new RuntimeException("Invalid email or password");
    }
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        System.out.println("STEP 1");

        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        System.out.println("STEP 2");

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        System.out.println("STEP 3");

        if ("NGO".equalsIgnoreCase(user.getRole())) {
            user.setApprovalStatus("PENDING");
        } else {
            user.setApprovalStatus("APPROVED");
        }

        System.out.println("STEP 4");

        userRepository.save(user);

        System.out.println("STEP 5");

        return "Registration Successful";
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestParam String email) {

        User user =
                userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException(
                    "User not found"
            );
        }

        String otp =
                String.valueOf(
                        100000 +
                                new Random().nextInt(900000)
                );

        user.setOtp(otp);

        user.setOtpExpiryTime(
                System.currentTimeMillis()
                        + 300000
        );

        userRepository.save(user);

        emailService.sendEmail(
                user.getEmail(),
                "FoodBridge Password Reset OTP",
                "Your OTP is: " + otp +
                        "\n\nValid for 5 minutes."
        );

        return "OTP Sent Successfully";
    }

    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestParam String email,
            @RequestParam String otp,
            @RequestParam String newPassword) {

        User user =
                userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException(
                    "User not found"
            );
        }

        if (user.getOtp() == null ||
                !user.getOtp().equals(otp)) {

            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        if (System.currentTimeMillis() >
                user.getOtpExpiryTime()) {

            throw new RuntimeException(
                    "OTP Expired"
            );
        }

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        user.setOtp(null);
        user.setOtpExpiryTime(null);

        userRepository.save(user);

        return "Password Reset Successful";
    }
}