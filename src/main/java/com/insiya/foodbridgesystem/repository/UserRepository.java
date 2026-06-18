package com.insiya.foodbridgesystem.repository;

import com.insiya.foodbridgesystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    List<User> findByRole(String role);

    long countByRole(String role);

    User findByName(String name);

    List<User> findByRoleAndApprovalStatus(
            String role,
            String approvalStatus
    );

}
