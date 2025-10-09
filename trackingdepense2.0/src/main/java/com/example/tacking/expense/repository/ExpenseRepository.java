package com.example.tacking.expense.repository;

import java.sql.Date;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tacking.category.dto.CategoryDTO;
import com.example.tacking.expense.entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

    boolean existsByCategory_LabelAndMontantAndDateAndDescription(
            String categoryLabel,
            Double montant,
            Date date,
            String description
    );
}

