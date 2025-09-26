package com.example.tacking.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.tacking.config.SecurityConfig;
import com.example.tacking.dto.UserAuthDTO;
import com.example.tacking.dto.UserDTO;
import com.example.tacking.entity.User;
import com.example.tacking.repository.UserRepository;

@Service
public class AuthUserService {
    
    private UserRepository userRepository;
    private SecurityConfig securityConfig;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    public AuthUserService(AuthenticationManager authenticationManager,
                            UserRepository userRepository,
                            SecurityConfig securityConfig,
                            JwtService jwtService){
        this.securityConfig = securityConfig;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public User register(UserDTO userDTO){
            if (this.userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email Already Used");
        }
        User userRegister = User.builder()
            .email(userDTO.getEmail())
            .name(userDTO.getName())
            .password(this.securityConfig.passwordEncoder().encode(userDTO.getPassword()))
            .build();
        this.userRepository.save(userRegister);
        return userRegister;
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
