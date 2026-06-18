package com.insiya.foodbridgesystem.controller;

import com.insiya.foodbridgesystem.entity.FoodRequest;
import com.insiya.foodbridgesystem.service.FoodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class FoodRequestController {

    @Autowired
    private FoodRequestService service;

    @PostMapping
    public FoodRequest create(@RequestBody FoodRequest request) {
        return service.createRequest(request);
    }

    @GetMapping
    public List<FoodRequest> getAll() {
        return service.getAllRequests();
    }

    @GetMapping("/{id}")
    public FoodRequest getById(@PathVariable Long id) {
        return service.getRequestById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteRequest(id);
        return "Request deleted successfully";
    }
}