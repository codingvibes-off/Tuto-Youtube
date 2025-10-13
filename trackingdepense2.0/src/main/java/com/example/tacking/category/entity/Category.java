package com.example.tacking.category.entity;

import java.sql.Date;
import java.util.UUID;

import com.example.tacking.category.dto.CategoryDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id; 
    @Column(name = "date", nullable = false)
    private Date date;
    @Column(name = "label", nullable = false)
    private String label;
    @Column(nullable = false)
    private Long version = 0L;

}
