package com.insiya.foodbridgesystem.controller;

import com.insiya.foodbridgesystem.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class ImageUploadController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping
    public Map<String, String> uploadImage(
            @RequestParam("file")
            MultipartFile file
    ) throws Exception {

        String imageUrl =
                cloudinaryService.uploadFile(file);

        return Map.of(
                "url",
                imageUrl
        );
    }
}