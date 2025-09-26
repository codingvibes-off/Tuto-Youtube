package com.example.tacking.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tacking.dto.SuccessDTO;
import com.example.tacking.entity.Expense;
import com.example.tacking.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;
    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }
    @GetMapping
    public List<Expense> getAllExpense() {
        return this.expenseService.getAllExpense();
    }
    @GetMapping("/{id}")
    public Optional<Expense> getExpense(@PathVariable UUID id) {
        return expenseService.getExpense(id);
    }

    @PostMapping("/")
    public Expense postExpense(@RequestBody Expense expense) {
        return expenseService.postExpense(expense);
    }

    @PutMapping("/{id}") 
    public  Expense putExpense(@PathVariable UUID id, @RequestBody Expense expense) {
        return expenseService.putExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public SuccessDTO deleteExpense(@PathVariable UUID id) {
        return expenseService.deleteExpense(id);
    }
}




