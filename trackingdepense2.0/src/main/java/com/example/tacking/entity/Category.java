package com.example.tacking.entity;

import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "category_id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id; 
    @Column(name = "date", nullable = false)
    private Date date;
    @Column(name = "label", nullable = false)
    private String label;
}
