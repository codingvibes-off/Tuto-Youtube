package com.example.tacking.expense;
import com.example.tacking.user.dto.AuthResponseDTO;
import com.example.tacking.user.dto.UserDTO;
import com.example.tacking.user.entity.User;
import com.example.tacking.user.repository.UserRepository;
import com.example.tacking.web.UrlMapping;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.net.URL;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import com.example.tacking.category.dto.CategoryDTO;
import com.example.tacking.category.entity.Category;
import com.example.tacking.category.repository.CategoryRepository;
import com.example.tacking.expense.dto.ExpenseDTO;
import com.example.tacking.expense.entity.Expense;
import com.example.tacking.expense.repository.ExpenseRepository;
@AutoConfigureMockMvc
@SpringBootTest
public class ExpenseControllerIT {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private TestCreateExpenseObject testCreateObject;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;
    //Date Object
    private final Date date = java.sql.Date.valueOf("2019-05-02");
    //CATEGORY
    
    private final String LABEL_1 = "Alimentation";
    private final String LABEL_2 = "Course";
    private final String LABEL_3 = "Investissement";

    //USER
    private final String MAIL_1 = UUID.randomUUID().toString()+"@example.com";
    private final String MAIL_2 = UUID.randomUUID().toString()+"@example.com";
    private final String MAIL_3 = UUID.randomUUID().toString()+"@example.com";
    //EXPENSE
    private final String NAME_1 = "User_1";
    private final String NAME_2 = "User_2";
    private final String NAME_3 = "User_3";

    private final String DESCRIPTION_EXPENSE_1 = "Course supermarché";
    private final String DESCRIPTION_EXPENSE_2 = "Taxi";
    private final String DESCRIPTION_EXPENSE_3 = "Cinéma";

    private final Double AMOUNT_EXPENSE_1 = 100.0;
    private final Double AMOUNT_EXPENSE_2 = 100.0;
    private final Double AMOUNT_EXPENSE_3 = 100.0;
    private final Boolean ENABLED_ACTIVE = Boolean.valueOf(true);
    private final Boolean ENABLED_NOT_ACTIVE = Boolean.valueOf(false);
    @BeforeEach
    void init(){
        // Création des objets de données de tests
        User user_1 = testCreateObject.createUser(UUID.randomUUID(), MAIL_1, NAME_1);
        User user_2 = testCreateObject.createUser(UUID.randomUUID(), MAIL_2, NAME_2);

        userRepository.save(user_1);
        userRepository.save(user_2);

        Category category_1 = testCreateObject.createCategory(UUID.randomUUID(), date, LABEL_1);
        Category category_2 = testCreateObject.createCategory(UUID.randomUUID(), date, LABEL_2);
        Category category_3 = testCreateObject.createCategory(UUID.randomUUID(), date, LABEL_3);
        Category category_4 = testCreateObject.createCategory(UUID.randomUUID(), date, "Loisirs");
        Category category_5 = testCreateObject.createCategory(UUID.randomUUID(), date, "Courses");

        categoryRepository.save(category_1);
        categoryRepository.save(category_2);
        categoryRepository.save(category_3);
        categoryRepository.save(category_4);
        categoryRepository.save(category_5);

        // Création de 10 dépenses avec 2 utilisateurs
        Expense expense_1 = testCreateObject.createExpense(UUID.randomUUID(), 45.90, category_1, "Restaurant", user_1, date);
        Expense expense_2 = testCreateObject.createExpense(UUID.randomUUID(), 120.00, category_2, "Achat vêtements", user_2, date);
        Expense expense_3 = testCreateObject.createExpense(UUID.randomUUID(), 15.50, category_3, "Café du matin", user_1, date);
        Expense expense_4 = testCreateObject.createExpense(UUID.randomUUID(), 80.00, category_4, "Sortie cinéma", user_2, date);
        Expense expense_5 = testCreateObject.createExpense(UUID.randomUUID(), 60.00, category_5, "Courses alimentaires", user_1, date);
        Expense expense_6 = testCreateObject.createExpense(UUID.randomUUID(), 200.00, category_1, "Achat livres tech", user_2, date);
        Expense expense_7 = testCreateObject.createExpense(UUID.randomUUID(), 35.00, category_2, "Essence", user_1, date);
        Expense expense_8 = testCreateObject.createExpense(UUID.randomUUID(), 90.00, category_3, "Cadeau anniversaire", user_2, date);
        Expense expense_9 = testCreateObject.createExpense(UUID.randomUUID(), 10.00, category_4, "Snack", user_1, date);
        Expense expense_10 = testCreateObject.createExpense(UUID.randomUUID(), 300.00, category_5, "Abonnement salle de sport", user_2, date);

        // Sauvegarde en base de données
        expenseRepository.save(expense_1);
        expenseRepository.save(expense_2);
        expenseRepository.save(expense_3);
        expenseRepository.save(expense_4);
        expenseRepository.save(expense_5);
        expenseRepository.save(expense_6);
        expenseRepository.save(expense_7);
        expenseRepository.save(expense_8);
        expenseRepository.save(expense_9);
        expenseRepository.save(expense_10);

    }
    @AfterEach
    void cleanup() throws IOException {
        expenseRepository.deleteAll();
        categoryRepository.deleteAll();
        userRepository.deleteAll();
    }

   @Test
    void shouldReturnCreateExpenseForAuthenticatedUser() throws Exception {

            UserDTO userDTO = UserDTO.builder()
                .email(MAIL_1)
                .password("test")
                .name(NAME_1)
                .build();

            User user = User.builder()
                .email(MAIL_1)
                .password(passwordEncoder.encode("test"))
                .enabled(ENABLED_ACTIVE)
                .version(0L)
                .name(NAME_1)
                .build();
        this.userRepository.save(user);

        MvcResult result =  this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.LOGIN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.accessToken").exists())
            .andExpect(jsonPath("$.refreshToken").exists())
            .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        AuthResponseDTO authResponse = objectMapper.readValue(responseBody, new TypeReference<AuthResponseDTO>() {});

        CategoryDTO categoryDTO = CategoryDTO.builder()
            .date(date)
            .label(LABEL_1)
            .build();
        ExpenseDTO expenseDTO = ExpenseDTO.builder()
            .categoryDTO(categoryDTO)
            .amount(19.99)
            .date(java.sql.Date.valueOf("2024-10-09"))
            .description("Abonnement Spotify")
            .build();

        // THEN : Exécution de la requête avec le header Authorization
        this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.EXPENSE)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", authResponse.getAccessToken())
                .content(objectMapper.writeValueAsString(expenseDTO)))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.amount").value(19.99))
            .andExpect(jsonPath("$.description").value("Abonnement Spotify"))
            .andExpect(jsonPath("$.date").exists())
            .andExpect(jsonPath("$.category").exists());
    }

    @Test
    void shoudReturnGetExpense(){
    }
    @Test
    void shoudReturnUpdateExpense(){
    }
    @Test
    void shoudReturnPostExpense() throws Exception {
    }
    @Test
    void shouldReturnAllExpenses() throws Exception {
       
       this.mockMvc.perform(MockMvcRequestBuilders.get("/api/expenses")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))

                .andExpect(jsonPath("$[0].amount").value(AMOUNT_EXPENSE_1))
                .andExpect(jsonPath("$[0].date").value(date.toString()))
                .andExpect(jsonPath("$[0].description").value(DESCRIPTION_EXPENSE_1))

                .andExpect(jsonPath("$[1].amount").value(AMOUNT_EXPENSE_2))
                .andExpect(jsonPath("$[1].date").value(date.toString()))
                .andExpect(jsonPath("$[1].description").value(DESCRIPTION_EXPENSE_2))

                .andExpect(jsonPath("$[2].amount").value(AMOUNT_EXPENSE_3))
                .andExpect(jsonPath("$[2].date").value(date.toString()))
                .andExpect(jsonPath("$[2].description").value(DESCRIPTION_EXPENSE_3))
                .andReturn();
    }



}