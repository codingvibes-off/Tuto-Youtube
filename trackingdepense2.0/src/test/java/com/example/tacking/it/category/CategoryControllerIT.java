package com.example.tacking.it.category;


import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.example.tacking.category.dto.CategoryDTO;
import com.example.tacking.category.entity.Category;
import com.example.tacking.category.repository.CategoryRepository;
import com.example.tacking.expense.entity.Expense;
import com.example.tacking.expense.repository.ExpenseRepository;
import com.example.tacking.it.expense.ExpenseTestDataFactory;
import com.example.tacking.user.dto.AuthResponseDTO;
import com.example.tacking.user.dto.UserDTO;
import com.example.tacking.user.entity.User;
import com.example.tacking.user.repository.UserRepository;
import com.example.tacking.web.UrlMapping;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
public class CategoryControllerIT {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ExpenseTestDataFactory expenseDataFactory;

    @Autowired
    private ObjectMapper objectMapper;

    private final LocalDate date = LocalDate.now();
    //CATEGORY
    private final String LABEL_1 = "Alimentation";
    private final String LABEL_2 = "Course";
    private final String LABEL_3 = "Investissement";
    private final String LABEL_4 = "Loisirs";
    private final String LABEL_5 = "Courses";
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
    private Category category_6;

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
        category_4 = expenseDataFactory.createCategory(date, LABEL_4);
        categoryRepository.save(category_4);
        category_5 = expenseDataFactory.createCategory( date, LABEL_5);
        categoryRepository.save(category_5);
        category_6 = expenseDataFactory.createCategory( date, LABEL_5);
        categoryRepository.save(category_6);
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

    @Test
    @DisplayName("createCategory - should be create a category")
    void createCategory_ShouldReturnCreatedCategory() throws Exception {
             UserDTO userDTO = UserDTO.builder()
                .email(MAIL_1)
                .password(PASSWORD)
                .name(NAME_1)
                .build();

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
        CategoryDTO categoryDTO = CategoryDTO.fromCategoryToDTO(category_1);

        this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.CATEGORY)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","Bearer " + authResponse.getAccessToken())
                        .content(objectMapper.writeValueAsString(categoryDTO)))
                 .andExpect(status().isOk())
                .andExpect(jsonPath("$.label").value(LABEL_1))
                .andExpect(jsonPath("$.date").value(date.toString()));
    }
    
    @Test
    @DisplayName("getCategoryById - should be return a category")
    void getCategoryById_ShouldReturnCategory() throws Exception {
                UserDTO userDTO = UserDTO.builder()
                .email(MAIL_1)
                .password(PASSWORD)
                .name(NAME_1)
                .build();

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
        CategoryDTO categoryDTO = CategoryDTO.fromCategoryToDTO(category_1);
           this.mockMvc.perform(MockMvcRequestBuilders.get(UrlMapping.API_BASE_PATH + UrlMapping.CATEGORY + "/{id}", categoryDTO.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","Bearer " + authResponse.getAccessToken()))
                 .andExpect(status().isOk())
                 .andExpect(jsonPath("$.id").value(categoryDTO.getId().toString()))
                 .andExpect(jsonPath("$.date").value(categoryDTO.getDate().toString()))
                 .andExpect(jsonPath("$.label").value(categoryDTO.getLabel()));
                
    
    }

    @Test
    @DisplayName("getAllCategories - should be return a list categories")
    void getAllCategories_ShouldReturnList() throws Exception {
                  UserDTO userDTO = UserDTO.builder()
                .email(MAIL_1)
                .password(PASSWORD)
                .name(NAME_1)
                .build();

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
           this.mockMvc.perform(MockMvcRequestBuilders.get(UrlMapping.API_BASE_PATH + UrlMapping.CATEGORY)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","Bearer " + authResponse.getAccessToken()))
                 .andExpect(status().isOk())
                 .andExpect(jsonPath("$[0].label").value(LABEL_1))
                .andExpect(jsonPath("$[1].label").value(LABEL_2))
                .andExpect(jsonPath("$[2].label").value(LABEL_3))
                .andExpect(jsonPath("$[3].label").value(LABEL_4))
                .andExpect(jsonPath("$[4].label").value(LABEL_5))
                .andExpect(jsonPath("$.length()").value(6));

    }

    @Test
    @DisplayName("✅ updateCategory - devrait mettre à jour une catégorie")
    void updateCategory_ShouldReturnUpdatedCategory() throws Exception {
            UserDTO userDTO = UserDTO.builder()
                .email(MAIL_1)
                .password(PASSWORD)
                .name(NAME_1)
                .build();

        MvcResult result =  this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.LOGIN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.accessToken").exists())
            .andExpect(jsonPath("$.refreshToken").exists())
            .andReturn();

        String responseBody = result.getResponse().getContentAsString();

        List<Category> listcategories = categoryRepository.findAll();
        CategoryDTO categoryDTO = CategoryDTO.fromCategoryToDTO(listcategories.get(0));
        categoryDTO.setDate(date);
        categoryDTO.setLabel("update category");
    
        AuthResponseDTO authResponse = objectMapper.readValue(responseBody, new TypeReference<AuthResponseDTO>() {});
        this.mockMvc.perform(MockMvcRequestBuilders.put(UrlMapping.API_BASE_PATH + UrlMapping.CATEGORY + "/{id}", categoryDTO.getId())
                        .header("Authorization","Bearer " + authResponse.getAccessToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(categoryDTO)))
                 .andExpect(status().isOk())
                 .andExpect(jsonPath("$.label").value("update category"));
    }

     @Test
    @DisplayName("Cannot Delete Category - should be delete a category")
    void deleteCategory_ShouldReturnExceptionDeletedCategory() throws Exception {
            UserDTO userDTO = UserDTO.builder()
                .email(MAIL_1)
                .password(PASSWORD)
                .name(NAME_1)
                .build();

        MvcResult result =  this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.LOGIN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.accessToken").exists())
            .andExpect(jsonPath("$.refreshToken").exists())
            .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        List<Category> listcategories = categoryRepository.findAll();
        CategoryDTO categoryDTO = CategoryDTO.fromCategoryToDTO(listcategories.get(0));  
        AuthResponseDTO authResponse = objectMapper.readValue(responseBody, new TypeReference<AuthResponseDTO>() {});
        
        this.mockMvc.perform(MockMvcRequestBuilders.delete(UrlMapping.API_BASE_PATH + UrlMapping.CATEGORY + "/{id}", categoryDTO.getId())
                        .header("Authorization","Bearer " + authResponse.getAccessToken())
                        .contentType(MediaType.APPLICATION_JSON))
                 .andExpect(status().isBadRequest())
                 .andExpect(jsonPath("$.message").value("Cannot delete category: it is still referenced by expenses."));
    }
    @Test
    @DisplayName("Delete Category - should be delete a category")
    void deleteCategory_ShouldReturnDeletedCategory() throws Exception {
            UserDTO userDTO = UserDTO.builder()
                .email(MAIL_1)
                .password(PASSWORD)
                .name(NAME_1)
                .build();

        MvcResult result =  this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.LOGIN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.accessToken").exists())
            .andExpect(jsonPath("$.refreshToken").exists())
            .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        List<Category> listcategories = categoryRepository.findAll();
        CategoryDTO categoryDTO = CategoryDTO.fromCategoryToDTO(listcategories.get(5));  
        AuthResponseDTO authResponse = objectMapper.readValue(responseBody, new TypeReference<AuthResponseDTO>() {});
        
        this.mockMvc.perform(MockMvcRequestBuilders.delete(UrlMapping.API_BASE_PATH + UrlMapping.CATEGORY + "/{id}", categoryDTO.getId())
                        .header("Authorization","Bearer " + authResponse.getAccessToken())
                        .contentType(MediaType.APPLICATION_JSON))
                 .andExpect(status().isOk())
                 .andExpect(jsonPath("$.message").value("Category deleted successfully"))
                 .andExpect(jsonPath("$.success").value("true"));
    }
}
