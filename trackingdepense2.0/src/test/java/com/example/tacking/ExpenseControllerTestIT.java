package com.example.tacking;
import com.example.tacking.TackingApplication;
import com.example.tacking.entity.Category;
import com.example.tacking.entity.Expense;
import com.example.tacking.entity.User;
import com.example.tacking.repository.CategoryRepository;
import com.example.tacking.repository.ExpenseRepository;
import com.example.tacking.repository.UserRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@AutoConfigureMockMvc
@SpringBootTest
public class ExpenseControllerTestIT {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ExpenseRepository expenseRepository;
    @BeforeEach
    void setup() {
        User user = new User();
        user.setId(UUID.randomUUID()); // unique à chaque test
        user.setName("Test User");
        user.setEmail(UUID.randomUUID() + "@example.com"); // email unique
        userRepository.save(user);

        Category category = new Category();
        category.setId(UUID.randomUUID());
        category.setLabel("Test Category");
        category.setDate(java.sql.Date.valueOf("2025-09-15"));
        categoryRepository.save(category);

        Expense expense = new Expense();
        expense.setId(UUID.randomUUID());
        expense.setAmount(100.0);
        expense.setDescription("Test Expense 1");
        expense.setDate(java.sql.Date.valueOf("2025-09-15"));
        expense.setUser(user);
        expense.setCategory(category);
        expenseRepository.save(expense);

    }
    @AfterEach
    void cleanup() throws IOException {
        expenseRepository.deleteAll();
        categoryRepository.deleteAll();
        userRepository.deleteAll();
    }
    @Test
    void shouldReturnAllExpenses() throws Exception {
       ResultActions result = this.mockMvc.perform(MockMvcRequestBuilders.get("/api/expenses")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
        
        MvcResult mvcResult = result.andReturn();
        String responseBody = mvcResult.getResponse().getContentAsString();
        System.out.println(responseBody);

    }


}