package com.example.tacking.it.expense;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.example.tacking.category.dto.CategoryDTO;
import com.example.tacking.category.entity.Category;
import com.example.tacking.category.repository.CategoryRepository;
import com.example.tacking.expense.dto.ExpenseDTO;
import com.example.tacking.expense.entity.Expense;
import com.example.tacking.expense.repository.ExpenseRepository;
import com.example.tacking.user.entity.User;
import com.example.tacking.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
class ExpenseControllerNoSecurityIT {
    //Date Object
    private final LocalDate date = LocalDate.now();
    //CATEGORY
    private final String LABEL_1 = "Alimentation";
    private final String LABEL_2 = "Course";
    private final String LABEL_3 = "Investissement";

    //USER
    private final String MAIL_1 = UUID.randomUUID().toString()+"@example.com";
    private final String MAIL_2 = UUID.randomUUID().toString()+"@example.com";
    //EXPENSE
    private final String NAME_1 = "User_1";
    private final String NAME_2 = "User_2";
    private final String PASSWORD = "test";
       private User user_1;
    private User user_2;


    private Category category_1;
    private Category category_2;
    private Category category_3;
    private Category category_4;
    private Category category_5;

    private Expense expense_1;
    private Expense expense_2;
    private Expense expense_3;
    private Expense expense_4;
    private Expense expense_5;
    private Expense expense_6;
    private Expense expense_7;
    private Expense expense_8;
    private Expense expense_9;
    private Expense expense_10;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ExpenseTestDataFactory expenseDataFactory;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseRepository expenseRepository;

    @BeforeEach
    void init(){
        //Création des utilisateurs
        user_1 = expenseDataFactory.createUser( MAIL_1, NAME_1, PASSWORD);
        userRepository.save(user_1);
        user_2 = expenseDataFactory.createUser( MAIL_2, NAME_2, PASSWORD);
        userRepository.save(user_2);
        //Création des Catégories pour trier les dépenses
        category_1 = expenseDataFactory.createCategory( date, LABEL_1);
        categoryRepository.save(category_1);
        category_2 = expenseDataFactory.createCategory( date, LABEL_2);
        categoryRepository.save(category_2);
        category_3 = expenseDataFactory.createCategory(date, LABEL_3);
        categoryRepository.save(category_3);
        category_4 = expenseDataFactory.createCategory(date, "Loisirs");
        categoryRepository.save(category_4);
        category_5 = expenseDataFactory.createCategory( date, "Courses");
        categoryRepository.save(category_5);
        // Création de 10 dépenses avec 2 utilisateurs
        expense_1 = expenseDataFactory.createExpense( 45.90, category_1, "Restaurant", user_1, date);
        expenseRepository.save(expense_1);
        expense_2 = expenseDataFactory.createExpense( 120.00, category_2, "Achat vêtements", user_2, date);
        expenseRepository.save(expense_2);
        expense_3 = expenseDataFactory.createExpense( 15.50, category_3, "Café du matin", user_1, date);
        expenseRepository.save(expense_3);
        expense_4 = expenseDataFactory.createExpense( 80.00, category_4, "Sortie cinéma", user_2, date);
        expenseRepository.save(expense_4);
        expense_5 = expenseDataFactory.createExpense( 60.00, category_5, "Courses alimentaires", user_1, date);
        expenseRepository.save(expense_5);
        expense_6 = expenseDataFactory.createExpense( 200.00, category_1, "Achat livres tech", user_2, date);
        expenseRepository.save(expense_6);
        expense_7 = expenseDataFactory.createExpense( 35.00, category_2, "Essence", user_1, date);
        expenseRepository.save(expense_7);
        expense_8 = expenseDataFactory.createExpense( 90.00, category_3, "Cadeau anniversaire", user_2, date);
        expenseRepository.save(expense_8);
        expense_9 = expenseDataFactory.createExpense( 10.00, category_4, "Snack", user_1, date);
        expenseRepository.save(expense_9);
        expense_10 = expenseDataFactory.createExpense( 300.00, category_5, "Abonnement salle de sport", user_2, date);
        expenseRepository.save(expense_10); 
    }
    @AfterEach
    void cleanup() throws IOException {
       expenseRepository.deleteAll();
       categoryRepository.deleteAll();
       userRepository.deleteAll();
   
    }

    private Category findCategoryByLabel(String label) {
    return categoryRepository.findAll().stream()
            .filter(c -> c.getLabel().equals(label))
            .findFirst()
            .orElseThrow(() -> new IllegalStateException("Category with label " + label + " not found"));
    }
    @Test
    void shouldReturnErrorWhenUserNotFound() throws Exception {
        CategoryDTO categoryDTO = CategoryDTO.builder()
            .id(findCategoryByLabel("Alimentation").getId())
            .build();
        ExpenseDTO expenseDTO = ExpenseDTO.builder()
            .date(LocalDate.now())
            .categoryDTO(categoryDTO)
            .amount(3.00)
            .description("Spotify Premium")
            .build();

        // Act & Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/expense")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(expenseDTO))
                .header("X-USER-ID", UUID.randomUUID().toString()))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("User not found"));
    }
}
