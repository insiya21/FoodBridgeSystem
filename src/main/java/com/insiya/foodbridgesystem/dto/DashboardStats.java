package com.insiya.foodbridgesystem.dto;

public class DashboardStats {

    private long totalDonations;
    private long totalNGOs;
    private long totalVolunteers;
    private long mealsSaved;

    public DashboardStats() {
    }

    public DashboardStats(long totalDonations,
                          long totalNGOs,
                          long totalVolunteers,
                          long mealsSaved) {
        this.totalDonations = totalDonations;
        this.totalNGOs = totalNGOs;
        this.totalVolunteers = totalVolunteers;
        this.mealsSaved = mealsSaved;
    }

    public long getTotalDonations() {
        return totalDonations;
    }

    public void setTotalDonations(long totalDonations) {
        this.totalDonations = totalDonations;
    }

    public long getTotalNGOs() {
        return totalNGOs;
    }

    public void setTotalNGOs(long totalNGOs) {
        this.totalNGOs = totalNGOs;
    }

    public long getTotalVolunteers() {
        return totalVolunteers;
    }

    public void setTotalVolunteers(long totalVolunteers) {
        this.totalVolunteers = totalVolunteers;
    }

    public long getMealsSaved() {
        return mealsSaved;
    }

    public void setMealsSaved(long mealsSaved) {
        this.mealsSaved = mealsSaved;
    }
}