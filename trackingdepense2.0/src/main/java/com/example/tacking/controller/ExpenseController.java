package com.example.tacking.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Expense> getAllexpense() {
        return this.expenseService.getAllExpense();
    }
   /*@GetMapping("/{id}")
    public List<expense> getexpense(@RequestParam String id) {
        return expenseService.getexpense(id);
    }

    @PostMapping("/")
    public List<expense> postexpense(@RequestBody User user) {
        return expenseService.postexpense(user);
    }

    @PutMapping("/{id}") 
    public List<expense> putexpense(@PathVariable String id, @RequestBody User user) {
        return expenseService.putexpense(id, user);
    }

    @DeleteMapping("/{id}")
    public SuccessDTO deleteexpense(@PathVariable String id) {
        return expenseService.deleteexpense(id);
    }*/
}




