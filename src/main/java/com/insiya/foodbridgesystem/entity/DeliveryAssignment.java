package com.insiya.foodbridgesystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "delivery_assignments")
public class DeliveryAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long donationId;

    private String foodName;

    private String ngoName;

    private String volunteerName;

    private String volunteerEmail;

    // ASSIGNED, PICKED_UP, DELIVERED
    private String status;

    public DeliveryAssignment() {
    }

    public DeliveryAssignment(Long id,
                              Long donationId,
                              String foodName,
                              String ngoName,
                              String volunteerName,
                              String volunteerEmail,
                              String status) {

        this.id = id;
        this.donationId = donationId;
        this.foodName = foodName;
        this.ngoName = ngoName;
        this.volunteerName = volunteerName;
        this.volunteerEmail = volunteerEmail;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDonationId() {
        return donationId;
    }

    public void setDonationId(Long donationId) {
        this.donationId = donationId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getNgoName() {
        return ngoName;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }

    public String getVolunteerName() {
        return volunteerName;
    }

    public void setVolunteerName(String volunteerName) {
        this.volunteerName = volunteerName;
    }

    public String getVolunteerEmail() {
        return volunteerEmail;
    }

    public void setVolunteerEmail(String volunteerEmail) {
        this.volunteerEmail = volunteerEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}