package com.example.tacking.expense.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.tacking.expense.entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {
}

