package com.example.tacking.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tacking.entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

}
