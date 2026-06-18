package com.insiya.foodbridgesystem.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {

        return new Cloudinary(
                Map.of(
                        "cloud_name", "de5v8euqt",
                        "api_key", "576944461862369",
                        "api_secret", "gi4GAPhFdbSP-NthoClOpq8qSQI"
                )
        );
    }
}