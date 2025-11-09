package com.example.tacking.it.expense;

import java.time.LocalDate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.tacking.category.entity.Category;
import com.example.tacking.expense.entity.Expense;
import com.example.tacking.user.entity.User;

@Component
public class ExpenseTestDataFactory {

    private final PasswordEncoder passwordEncoder;

    ExpenseTestDataFactory(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    public Category createCategory(LocalDate date,  String label){
        Category category = new Category();
        category.setDate(date);
        category.setVersion(1L);
        category.setLabel(label);
        return category;
    }
    public Expense createExpense(Double amount, Category category, String description, User user, LocalDate date){
        Expense expense = new Expense();
        expense.setAmount(amount);
        expense.setCategory(category);
        expense.setDescription(description);
        expense.setUser(user);
        expense.setDate(date);
        return expense;
    }
    public User createUser(String email, String name, String password){
        User user = new User();
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setEnabled(true);
        user.setName(name);
        return user;
    }
}
