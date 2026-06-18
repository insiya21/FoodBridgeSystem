package com.insiya.foodbridgesystem.controller;

import com.insiya.foodbridgesystem.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/test")
    public String testEmail() {

        emailService.sendEmail(
                "insiyasaify21@gmail.com",
                "FoodBridge Test Email",
                "Congratulations! Email service is working."
        );

        return "Email Sent Successfully";
    }
}