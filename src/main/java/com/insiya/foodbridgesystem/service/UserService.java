package com.insiya.foodbridgesystem.service;

import com.insiya.foodbridgesystem.dto.UserResponseDto;
import com.insiya.foodbridgesystem.entity.User;
import com.insiya.foodbridgesystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Convert User Entity to UserResponseDto
    private UserResponseDto convertToDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().toString()   // If role is String, replace with user.getRole()
        );
    }

    // Register User
    public User registerUser(User user) {

        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Admin registration is not allowed.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // Get All Users (without password)
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<User> getVolunteers() {
        return userRepository.findByRole("VOLUNTEER");
    }

    // Get User By ID (without password)
    public UserResponseDto getUserById(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        return convertToDto(user);
    }

    // Update User
    public User updateUser(Long id, User updatedUser) {

        User existingUser =
                userRepository.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhoneNumber(
                updatedUser.getPhoneNumber()
        );

        return userRepository.save(existingUser);
    }

    // Delete User
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public String changePassword(
            Long userId,
            String currentPassword,
            String newPassword) {

        User user =
                userRepository.findById(userId).orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (!passwordEncoder.matches(
                currentPassword,
                user.getPassword())) {

            return "Current password is incorrect";
        }

        user.setPassword(
                passwordEncoder.encode(newPassword));

        userRepository.save(user);

        return "Password updated successfully";
    }
}