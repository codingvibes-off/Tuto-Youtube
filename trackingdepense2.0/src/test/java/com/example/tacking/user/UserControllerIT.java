package com.example.tacking.user;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.example.tacking.TackingApplication;
import com.example.tacking.otp.dto.OtpDTO;
import com.example.tacking.otp.entity.Otp;
import com.example.tacking.otp.repository.OtpRepository;
import com.example.tacking.user.dto.AuthResponseDTO;
import com.example.tacking.user.dto.UserDTO;
import com.example.tacking.user.entity.User;
import com.example.tacking.user.repository.UserRepository;
import com.example.tacking.web.UrlMapping;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@AutoConfigureMockMvc
@SpringBootTest(classes = TackingApplication.class)
public class UserControllerIT {
    //Date Object
    private final Date date = java.sql.Date.valueOf("2019-05-02");
    //CATEGORY
    
    private final String LABEL_1 = "Alimentation";
    private final String LABEL_2 = "Course";
    private final String LABEL_3 = "Investissement";

    //USER
    private final String MAIL_1 = UUID.randomUUID().toString()+"@yopmail.com";
    //EXPENSE
    private final String NAME_1 = "User_1";
    //OTP CODE
    private final String OTP_CODE = "8890";
    private LocalDateTime expiration_date = LocalDateTime.now();
    private final Boolean ENABLED_ACTIVE = true;
    private final Boolean ENABLED_NOT_ACTIVE = false;

      @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @AfterEach
    void cleanup() throws IOException {
        this.userRepository.deleteAll();
        this.otpRepository.deleteAll();
    }
    @Test
    void shouldReturnRegisterUser() throws Exception {
        UserDTO userDTO = UserDTO.builder()
            .email(MAIL_1)
            .password("test")
            .name(NAME_1)
            .build();
        this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.REGISTER)
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
     @Test
    void shoudlUserLogin() throws Exception {
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

    String[] parts = authResponse.getAccessToken().split("\\.");
    String payload = new String(Base64.getDecoder().decode(parts[1]));
    assertTrue(payload.contains("\"sub\":\"" + userDTO.getEmail() + "\""));
    }

    @Test
    void shouldUserInvalidCredentials() throws Exception {
           
        User userRegistered = User.builder().email("userRegistered@gmail.com")
        .enabled(ENABLED_NOT_ACTIVE)
        .name("userRegistered")
        .version(0L)
        .password("test-false-password").build();
        this.userRepository.save(userRegistered);

        UserDTO userDTO = UserDTO.builder()
        .email(userRegistered.getEmail())
        .password("test-login-bad-credentials")
        .build();
        
        this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.LOGIN)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(userDTO)))
    .andExpect(status().isBadRequest())
    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    .andExpect(jsonPath("$.accessToken").doesNotExist())
    .andExpect(jsonPath("$.refreshToken").doesNotExist())
    .andExpect(jsonPath("$.message").value("Invalid credentials"))
    .andReturn();
    }
    @Test
    void shouldUserIsNotEnabled() throws Exception {
        User userRegistered = User.builder().email("userRegistered@gmail.com")
        .enabled(ENABLED_NOT_ACTIVE)
        .name("userRegistered")
        .version(0L)
        .password(passwordEncoder.encode("test-false-password")).build();
        this.userRepository.save(userRegistered);

        UserDTO userDTO = UserDTO.builder()
        .email(userRegistered.getEmail())
        .name("userRegistered")
        .password("test-false-password")
        .build();
        
        this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.LOGIN)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(userDTO)))
            .andExpect(status().isForbidden())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.accessToken").doesNotExist())
            .andExpect(jsonPath("$.refreshToken").doesNotExist())
            .andExpect(jsonPath("$.message").value("User account is disabled"))
            .andReturn();
    }

    @Test
    void shoudlEmailAlreadyUsed() throws Exception {
        UserDTO userDTO = UserDTO.builder()
        .email(MAIL_1)
        .password("test")
        .name(NAME_1)
        .build();
       this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.LOGIN)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(userDTO)))
    .andExpect(status().isBadRequest())
    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    .andExpect(jsonPath("$.message").value("User not found"))
    .andReturn();
    }
    @Test
    void shouldOtpCheck() throws Exception {
        User user = User.builder()
        .email(MAIL_1)
        .enabled(ENABLED_NOT_ACTIVE)
        .password("test")
        .version(0L)
        .name(NAME_1)
        .build();

       this.userRepository.save(user);

    
       Otp userRegisterOtp = Otp.builder()
        .code(OTP_CODE)
        .expiration(LocalDateTime.now().plusMinutes(5))
        .useremail(user.getEmail())
        .user(user)
        .build();

       this.otpRepository.save(userRegisterOtp);

       OtpDTO otpDTO = new OtpDTO();
       otpDTO.setCode(OTP_CODE);
       otpDTO.setUseremail(user.getEmail());

       this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.OTP + UrlMapping.CHECK + UrlMapping.CODE, OTP_CODE)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(otpDTO)))
    .andExpect(status().isOk())
    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    .andExpect(jsonPath("$.success").value(Boolean.valueOf(true)))
    .andReturn();
    }
   
    @Test
    void shouldUserEmailNotValidated() throws Exception {
             User user = User.builder()
        .email("test.test-validated@yopmail.com")
        .enabled(ENABLED_NOT_ACTIVE)
        .password("validated")
        .version(0L)
        .name("name-user-mail")
        .build();
        
        this.userRepository.save(user);
          
        User different_user = User.builder()
        .email("different_user@yopmail.com")
        .enabled(ENABLED_NOT_ACTIVE)
        .password("not-validated")
        .version(0L)
        .name("differentemail")
        .build();

       this.userRepository.save(different_user);

       Otp userRegisterOtp = Otp.builder()
        .code("9000")
        .expiration(LocalDateTime.now().plusMinutes(5))
        .useremail("test.not-validated@yopmail.com")
        .user(user)
        .build();

       this.otpRepository.save(userRegisterOtp);

       OtpDTO otpDTO = new OtpDTO();
       otpDTO.setCode("9000");
       otpDTO.setUseremail(different_user.getEmail());

       this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.OTP + UrlMapping.CHECK + UrlMapping.CODE, OTP_CODE)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(otpDTO)))
    .andExpect(status().isOk())
    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    .andExpect(jsonPath("$.success").value(Boolean.valueOf(false)))
    .andExpect(jsonPath("$.message").value("Code And email not validated"))
    .andReturn();
    }
    
    @Test
    void shouldCodeNotValidated() throws Exception {
               User user = User.builder()
        .email("test.test-validated@yopmail.com")
        .enabled(ENABLED_NOT_ACTIVE)
        .password("validated")
        .version(0L)
        .name("name-user-mail")
        .build();
        
        this.userRepository.save(user);
          
        User different_user = User.builder()
        .email("different_user@yopmail.com")
        .enabled(ENABLED_NOT_ACTIVE)
        .password("not-validated")
        .version(0L)
        .name("differentemail")
        .build();

       this.userRepository.save(different_user);

       Otp userRegisterOtp = Otp.builder()
        .code("8000")
        .expiration(LocalDateTime.now().plusMinutes(5))
        .useremail("test.not-validated@yopmail.com")
        .user(user)
        .build();

       this.otpRepository.save(userRegisterOtp);

       OtpDTO otpDTO = new OtpDTO();
       otpDTO.setCode("9000");
       otpDTO.setUseremail(different_user.getEmail());

       this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.OTP + UrlMapping.CHECK + UrlMapping.CODE, userRegisterOtp.getCode())
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(otpDTO)))
    .andExpect(status().isOk())
    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    .andExpect(jsonPath("$.success").value(Boolean.valueOf(false)))
    .andExpect(jsonPath("$.message").value("Code And email not validated"))
    .andReturn();
    }

    @Test
    void shoudlOtpWasExpired() throws Exception {
            User user = User.builder()
        .email(MAIL_1)
        .enabled(ENABLED_NOT_ACTIVE)
        .password("test")
        .version(0L)
        .name(NAME_1)
        .build();

       this.userRepository.save(user);

       Otp userRegisterOtp = Otp.builder()
        .code(OTP_CODE)
        .expiration(LocalDateTime.now().minusMinutes(5))
        .useremail(user.getEmail())
        .user(user)
        .build();

       this.otpRepository.save(userRegisterOtp);

       OtpDTO otpDTO = new OtpDTO();
       otpDTO.setCode(OTP_CODE);
       otpDTO.setUseremail(user.getEmail());

       this.mockMvc.perform(MockMvcRequestBuilders.post(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.OTP + UrlMapping.CHECK + UrlMapping.CODE, OTP_CODE)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(otpDTO)))
    .andExpect(status().isBadRequest())
    .andExpect(jsonPath("$.message").value("Localdate was expired"))
    .andReturn();
    }


    @Test
    void shouldUpdateUser() throws Exception {
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

    UserDTO updatedUser = UserDTO.builder()
    .email("update@gmail.com")
    .password("updatedPassword")
    .name("updatedUser")
    .build();

    this.mockMvc.perform(MockMvcRequestBuilders.put(UrlMapping.API_BASE_PATH + UrlMapping.USER + UrlMapping.UPDATE)
        .header("Authorization", "Bearer " + authResponse.getAccessToken())  
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updatedUser)))
    .andExpect(status().isOk())
    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    .andExpect(jsonPath("$.name").value(updatedUser.getName()))
    .andExpect(jsonPath("$.email").value(updatedUser.getEmail()))
    .andReturn();

    Optional<User> userUpdated = userRepository.findByName(updatedUser.getName());
    assertTrue(userUpdated.isPresent());

    User userOptionnal = userUpdated.get();
    assertEquals(updatedUser.getEmail(), userOptionnal.getEmail());
    assertTrue(passwordEncoder.matches("updatedPassword", userOptionnal.getPassword())); 
     }
    

   
   







}