package com.example.tacking.expense.controller;

import java.security.Principal;
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
import org.springframework.web.bind.annotation.RestController;

import com.example.tacking.web.UrlMapping;
import com.example.tacking.expense.dto.ExpenseDTO;
import com.example.tacking.expense.entity.Expense;
import com.example.tacking.expense.service.ExpenseService;
import com.example.tacking.user.dto.SuccessDTO;
import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.service.UserService;

@RestController
@RequestMapping(UrlMapping.API_BASE_PATH)
public class ExpenseController {
    private final UserService userService;
    private final ExpenseService expenseService;
    public ExpenseController(ExpenseService expenseService, UserService userService){
        this.expenseService = expenseService;
        this.userService = userService;
    }
    @GetMapping
    public List<Expense> getAllExpense() {
        return this.expenseService.getAllExpense();
    }
    @GetMapping(UrlMapping.EXPENSE + "/{expenseId}")
    public Optional<Expense> getExpense(@PathVariable UUID expenseId) {
        return expenseService.getExpense(expenseId);
    }
    @PostMapping(UrlMapping.EXPENSE)
    public ExpenseDTO postExpense(@RequestBody ExpenseDTO expenseDTO, Principal principal) {
        UserAuthDTO userAuthDTO = userService.getUserAuthenticated(principal.getName());
        return expenseService.postExpense(expenseDTO, userAuthDTO); 
    }
    @PutMapping(UrlMapping.EXPENSE + "/{expenseId}") 
    public  Expense putExpense(@PathVariable UUID expenseId, @RequestBody Expense expense) {
        return expenseService.putExpense(expenseId, expense);
    }
    @DeleteMapping(UrlMapping.EXPENSE + "/{expenseId}")
    public SuccessDTO deleteExpense(@PathVariable UUID id) {
        return expenseService.deleteExpense(id);
    }
}




