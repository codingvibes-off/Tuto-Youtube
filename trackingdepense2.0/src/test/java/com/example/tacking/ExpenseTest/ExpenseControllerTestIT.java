package com.example.tacking.ExpenseTest;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.http.MediaType;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.sql.Date;
import java.util.UUID;

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

    @Autowired
    private TestCreateExpenseObject testCreateObject;
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
    @BeforeEach
    void init(){
        //On crée les objets de données de tests
        User user_1 = testCreateObject.createUser(UUID.randomUUID(),MAIL_1,NAME_1);
        User user_2 = testCreateObject.createUser(UUID.randomUUID(),MAIL_2,NAME_2);
        User user_3 = testCreateObject.createUser(UUID.randomUUID(),MAIL_3,NAME_3);

        userRepository.save(user_1);
        userRepository.save(user_2);
        userRepository.save(user_3);

        Category category_1 = testCreateObject.createCategory(UUID.randomUUID(),date, LABEL_1);
        Category category_2 = testCreateObject.createCategory(UUID.randomUUID() ,date, LABEL_2);
        Category category_3 = testCreateObject.createCategory(UUID.randomUUID(), date, LABEL_3);
        
        categoryRepository.save(category_1);
        categoryRepository.save(category_2);
        categoryRepository.save(category_3);

        Expense expense_1 = testCreateObject.createExpense(UUID.randomUUID(),AMOUNT_EXPENSE_1, category_1, DESCRIPTION_EXPENSE_1, user_1, date);
        Expense expense_2 = testCreateObject.createExpense(UUID.randomUUID(),AMOUNT_EXPENSE_2, category_2, DESCRIPTION_EXPENSE_2, user_2, date);
        Expense expense_3 = testCreateObject.createExpense(UUID.randomUUID(),AMOUNT_EXPENSE_3, category_3, DESCRIPTION_EXPENSE_3, user_3, date);
        //Sauvegarde en base de donnée
        expenseRepository.save(expense_1);
        expenseRepository.save(expense_2);
        expenseRepository.save(expense_3);
    }
    @AfterEach
    void cleanup() throws IOException {
        expenseRepository.deleteAll();
        categoryRepository.deleteAll();
        userRepository.deleteAll();
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