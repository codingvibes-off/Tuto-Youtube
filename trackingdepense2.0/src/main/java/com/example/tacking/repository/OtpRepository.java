package com.example.tacking.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tacking.entity.Otp;

@Repository
public interface OtpRepository extends JpaRepository<Otp, UUID> {
    Optional<Otp> findByUseremailAndCode(String userEmail, String code);
    Optional<Otp> deleteByCode(String code);

}