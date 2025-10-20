package com.example.tacking.otp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.time.LocalDateTime;
import java.util.UUID;

import com.example.tacking.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "otp")
public class Otp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;
    @Column(name = "useremail", updatable = false, nullable = false)
    private String useremail;
    @Column(name = "code", updatable = false, nullable = false)
    private String code;
    @Column(name = "expiration", updatable = false, nullable = false)
    private LocalDateTime expiration;
    @OneToOne
    @JoinColumn(name = "user_id") 
    private User user;
}
