package com.example.tacking.ExpenseTest;

import java.sql.Date;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.example.tacking.entity.Category;
import com.example.tacking.entity.Expense;
import com.example.tacking.entity.User;

@Component
public class TestCreateExpenseObject {
    //Créer une catégorie
    public Category createCategory(UUID id,Date date,  String label){
        Category category = new Category();
        category.setId(id);
        category.setDate(date);
        category.setLabel(label);
        return category;
    }
    //Créer une Dépense
    public Expense createExpense(UUID id ,Double amount, Category category, String description, User user, Date date){
        Expense expense = new Expense();
        expense.setId(id);
        expense.setAmount(amount);
        expense.setCategory(category);
        expense.setDescription(description);
        expense.setUser(user);
        expense.setDate(date);
        return expense;
    }
    //Créer un utilisateur
    public User createUser(UUID id,String email, String name){
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setName(name);
        return user;
    }
}
