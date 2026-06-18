package com.insiya.foodbridgesystem.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "food_donations")
public class FoodDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Food name is required")
    private String foodName;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;

    @NotBlank(message = "Expiry time is required")
    private String expiryTime;

    private String description;

    @NotBlank(message = "Donor name is required")
    private String donorName;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    private String donorEmail;

    @Column(length = 500)
    private String imageUrl;

    // Donation Status
    private String status;

    // NGO who claimed the donation
    private String claimedBy;

    private String ngoAddress;

    // Volunteer assigned by Admin
    private String assignedVolunteer;

    private String deliveredAt;

    public FoodDonation() {
    }

    public FoodDonation(
            Long id,
            String foodName,
            Integer quantity,
            String category,
            String pickupAddress,
            String expiryTime,
            String description,
            String donorName,
            String contactNumber,
            String status,
            String claimedBy,
            String ngoAddress,
            String assignedVolunteer
    ) {
        this.id = id;
        this.foodName = foodName;
        this.quantity = quantity;
        this.category = category;
        this.pickupAddress = pickupAddress;
        this.expiryTime = expiryTime;
        this.description = description;
        this.donorName = donorName;
        this.contactNumber = contactNumber;
        this.status = status;
        this.claimedBy = claimedBy;
        this.ngoAddress = ngoAddress;
        this.assignedVolunteer = assignedVolunteer;
    }

    // ===================== Getters & Setters =====================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPickupAddress() {
        return pickupAddress;
    }

    public void setPickupAddress(String pickupAddress) {
        this.pickupAddress = pickupAddress;
    }

    public String getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(String expiryTime) {
        this.expiryTime = expiryTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getClaimedBy() {
        return claimedBy;
    }

    public void setClaimedBy(String claimedBy) {
        this.claimedBy = claimedBy;
    }

    public String getAssignedVolunteer() {
        return assignedVolunteer;
    }

    public void setAssignedVolunteer(String assignedVolunteer) {
        this.assignedVolunteer = assignedVolunteer;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getNgoAddress() {
        return ngoAddress;
    }

    public void setNgoAddress(String ngoAddress) {
        this.ngoAddress = ngoAddress;
    }

    public String getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(String deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }
}