package com.insiya.foodbridgesystem.service;

import com.insiya.foodbridgesystem.entity.FoodRequest;
import com.insiya.foodbridgesystem.repository.FoodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodRequestService {

    @Autowired
    private FoodRequestRepository repository;

    public FoodRequest createRequest(FoodRequest request) {
        request.setStatus("PENDING");
        return repository.save(request);
    }

    public List<FoodRequest> getAllRequests() {
        return repository.findAll();
    }

    public FoodRequest getRequestById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteRequest(Long id) {
        repository.deleteById(id);
    }
}