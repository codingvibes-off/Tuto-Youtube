package com.example.tacking.service;

import com.example.tacking.entity.Expense;
import com.example.tacking.entity.User;
import com.example.tacking.repository.ExpenseRepository;
import com.example.tacking.repository.UserRepository;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {
  private static ExpenseRepository expenseRepository;
  ExpenseService(ExpenseRepository expenseRepository ){
    this.expenseRepository = expenseRepository;
  }
  public List<Expense> getAllExpense(){
    return this.expenseRepository.findAll();
  }
}