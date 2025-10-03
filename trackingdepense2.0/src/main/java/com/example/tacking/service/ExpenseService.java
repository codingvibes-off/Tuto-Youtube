package com.example.tacking.service;

import com.example.tacking.dto.SuccessDTO;
import com.example.tacking.entity.Expense;
import com.example.tacking.repository.ExpenseRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class ExpenseService {
  private static ExpenseRepository expenseRepository;
    ExpenseService(ExpenseRepository expenseRepository ){
      this.expenseRepository = expenseRepository;
    }
    public List<Expense> getAllExpense(){
      return this.expenseRepository.findAll();
    }
    public Optional<Expense> getExpense(UUID id) {
        return this.expenseRepository.findById(id);
    }
    public Expense postExpense(@RequestBody Expense expense) {
        return this.expenseRepository.save(expense);
    }

    public Expense putExpense(@PathVariable UUID id, @RequestBody Expense updatedExpense) {
    Expense expense = this.expenseRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Expense not found"));
        expense.setAmount(updatedExpense.getAmount());
        expense.setDescription(updatedExpense.getDescription());
        expense.setDate(updatedExpense.getDate());
        expense.setCategory(updatedExpense.getCategory());
        return this.expenseRepository.save(expense);
}

public SuccessDTO deleteExpense(@PathVariable UUID id) {
    Expense expense = this.expenseRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Expense not found"));

    this.expenseRepository.deleteById(expense.getId());
    return SuccessDTO.builder()
    .success(true)
    .message("Expense deleted Succesfull !").build();
}

}