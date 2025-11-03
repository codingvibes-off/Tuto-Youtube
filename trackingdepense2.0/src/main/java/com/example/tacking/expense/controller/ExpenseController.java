package com.example.tacking.expense.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.example.tacking.security.util.SecurityUtil;
import com.example.tacking.user.dto.SuccessDTO;
import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.exception.UserNotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(UrlMapping.API_BASE_PATH)
public class ExpenseController {
    private final ExpenseService expenseService;
    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }
    @GetMapping
    public List<Expense> getAllExpense(Principal principal) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if(userAuthDTO == null){
            throw new UserNotFoundException("User not found");
        }
        return this.expenseService.getAllExpense();
    }
    @GetMapping(UrlMapping.EXPENSE + "/{expenseId}")
    public Optional<Expense> getExpense(Principal principal,@PathVariable UUID expenseId) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if(userAuthDTO == null){
            throw new UserNotFoundException("User not found");
        }
        return expenseService.getExpense(expenseId);
    }
    @PostMapping(UrlMapping.EXPENSE)
    public ExpenseDTO postExpense(@RequestBody ExpenseDTO expenseDTO, Principal principal) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        return expenseService.postExpense(expenseDTO, userAuthDTO);
    }
    @PutMapping(UrlMapping.EXPENSE + "/{expenseId}") 
    public  Expense putExpense(@PathVariable UUID expenseId, @RequestBody Expense expense, Principal principal) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if(userAuthDTO == null){
            throw new UserNotFoundException("User not found");
        }
        return expenseService.putExpense(expenseId, expense);
    }
    @DeleteMapping(UrlMapping.EXPENSE + "/{expenseId}")
    public SuccessDTO deleteExpense(Principal principal,@PathVariable UUID id) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if(userAuthDTO == null){
            throw new UserNotFoundException("User not found");
        }
        return expenseService.deleteExpense(id);
    }
}




