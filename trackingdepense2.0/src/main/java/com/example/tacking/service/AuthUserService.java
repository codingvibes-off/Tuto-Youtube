package com.example.tacking.service;

import java.time.LocalDateTime;

import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.tacking.config.SecurityConfig;
import com.example.tacking.dto.OtpDTO;
import com.example.tacking.dto.UserDTO;
import com.example.tacking.dto.UserResponseDTO;
import com.example.tacking.entity.Otp;
import com.example.tacking.entity.User;
import com.example.tacking.repository.OtpRepository;
import com.example.tacking.repository.UserRepository;
import com.example.tacking.util.OtpUtil;

@Service
public class AuthUserService {

    private final OtpRepository otpRepository;
    
    private UserRepository userRepository;
    private SecurityConfig securityConfig;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    private MailService mailService;
    public AuthUserService(AuthenticationManager authenticationManager,
                            UserRepository userRepository,
                            SecurityConfig securityConfig,
                            JwtService jwtService, MailService mailService, OtpRepository otpRepository){
        this.securityConfig = securityConfig;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.mailService = mailService;
        this.otpRepository = otpRepository;
    }
    

    public UserResponseDTO register(UserDTO userDTO){
        if (this.userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email Already Used");
        }
        User userRegister = User.builder()
            .email(userDTO.getEmail())
            .name(userDTO.getName())
            .enabled(false)
            .version(0L)
            .password(this.securityConfig.passwordEncoder().encode(userDTO.getPassword()))
            .build();
       this.userRepository.save(userRegister);

       Otp userRegisterOtp = Otp.builder()
        .code(OtpUtil.generateOtp())
        .expiration(LocalDateTime.now().plusMinutes(5))
        .useremail(userDTO.getEmail())
        .build();
        try {
            mailService.sendOtpEmail(userDTO.getEmail(), userRegisterOtp.getCode());
            return UserResponseDTO.builder()
                .email(userRegister.getEmail())
                .name(userRegister.getName())
                .build();

        } catch (MailException e) {
            throw new RuntimeException("Mail not sent !", e);
        }

    }
    public OtpDTO checkOtp(OtpDTO otpDTO){
        //Verifier si l'otp générer en base de donnée et entrer par l'utilisateur ton égale
        if(otpDTO.getExpiration().isAfter(LocalDateTime.now())){
            this.otpRepository.findByUseremailAndCode(otpDTO.getUseremail(), otpDTO.getCode())
                .orElseThrow(() -> new RuntimeException("Code and UserEmail not validated"));
        } else {
            throw new RuntimeException("Code and UserEmail not validated");
        }
        this.otpRepository.deleteByCode(otpDTO.getCode());
        return otpDTO;
    }
    public String verify(UserDTO userDTO) {
        Authentication authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
        if(authentication.isAuthenticated()){
            return this.jwtService.generateToken(userDTO);
        } else {
            return "fail";
        }  
    }
}
