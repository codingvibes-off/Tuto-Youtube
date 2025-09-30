package com.example.tacking.AuthTest;

import com.example.tacking.ExpenseTest.TestCreateExpenseObject;
import com.example.tacking.dto.UserDTO;
import com.example.tacking.entity.User;
import com.example.tacking.repository.OtpRepository;
import com.example.tacking.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.sql.Date;
import java.util.UUID;

@AutoConfigureMockMvc
@SpringBootTest
public class AuthControllerTestIT {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;
    
    @Autowired
    private TestCreateExpenseObject testCreateObject;
    
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;
    //Date Object
    private final Date date = java.sql.Date.valueOf("2019-05-02");
    //CATEGORY
    
    private final String LABEL_1 = "Alimentation";
    private final String LABEL_2 = "Course";
    private final String LABEL_3 = "Investissement";

    //USER
    private final String MAIL_1 = UUID.randomUUID().toString()+"@example.com";
    //EXPENSE
    private final String NAME_1 = "User_1";

    /*@AfterEach
    void cleanup() throws IOException {
        userRepository.deleteAll();
    }*/

    @Test
    void shouldReturnRegisterUser() throws Exception {
       UserDTO userDTO = UserDTO.builder()
       .email(MAIL_1)
       .password("test")
       .name(NAME_1)
       .build();

       this.mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(userDTO)))
    .andExpect(status().isOk())
    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    .andExpect(jsonPath("$.name").value(NAME_1))
    .andExpect(jsonPath("$.email").value(MAIL_1))
    .andExpect(jsonPath("$.password").doesNotExist()) 
    .andReturn();

    User savedUser = userRepository.findByEmail(MAIL_1).orElseThrow();
    assertTrue(passwordEncoder.matches(userDTO.getPassword(), savedUser.getPassword()));

    
    }



}