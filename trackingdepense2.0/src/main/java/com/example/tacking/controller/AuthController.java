package com.example.tacking.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tacking.util.JwtUtil;
import com.example.tacking.dto.AuthRequestDTO;
import com.example.tacking.dto.UserAuthDTO;
import com.example.tacking.dto.UserDTO;
import com.example.tacking.entity.User;
import com.example.tacking.service.AuthUserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private AuthUserService authUserService;
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
    AuthUserService authUserService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.authUserService = authUserService;
    }
    @PostMapping("/register")
    public User register(@RequestBody UserDTO userDTO) {
        return this.authUserService.register(userDTO);
    } 
    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        return this.authUserService.verify(userDTO);
    }
} 



