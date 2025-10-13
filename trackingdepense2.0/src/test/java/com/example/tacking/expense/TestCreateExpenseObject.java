package com.example.tacking.expense;

import java.sql.Date;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.tacking.category.entity.Category;
import com.example.tacking.expense.entity.Expense;
import com.example.tacking.user.entity.User;

@Component
public class TestCreateExpenseObject {

    private final PasswordEncoder passwordEncoder;

    TestCreateExpenseObject(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    //Créer une catégorie
    public Category createCategory(Date date,  String label){
        Category category = new Category();
        category.setDate(date);
        category.setVersion(1L);
        category.setLabel(label);
        return category;
    }
    //Créer une Dépense
    public Expense createExpense(Double amount, Category category, String description, User user, Date date){
        Expense expense = new Expense();
        expense.setAmount(amount);
        expense.setCategory(category);
        expense.setDescription(description);
        expense.setUser(user);
        expense.setDate(date);
        return expense;
    }
    //Créer un utilisateur
    public User createUser(String email, String name, String password){
        User user = new User();
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setEnabled(true);
        user.setName(name);
        return user;
    }
}
