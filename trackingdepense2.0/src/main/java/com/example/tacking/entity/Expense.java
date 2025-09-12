package com.example.tacking.entity;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "expense")
public class Expense {
    @Id
    @Column(name = "expense_id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id; 
    @Column(name = "montant", nullable = false)
    private Double montant;
    @Column(name = "date", nullable = false)
    private Date date;
    @Column(name = "description", nullable = false)
    private String description;
    @ManyToOne
    @JoinColumn(name = "user_id") // clé étrangère vers User
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id") // clé étrangère vers User
    private Category category;
}
