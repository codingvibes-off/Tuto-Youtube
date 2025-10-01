package com.example.tacking.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tacking.util.JwtUtil;

import io.jsonwebtoken.io.IOException;
import jakarta.mail.MessagingException;

import com.example.tacking.dto.AuthRequestDTO;
import com.example.tacking.dto.OtpDTO;
import com.example.tacking.dto.SuccessDTO;
import com.example.tacking.dto.UserAuthDTO;
import com.example.tacking.dto.UserDTO;
import com.example.tacking.dto.UserResponseDTO;
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
    public UserResponseDTO register(@RequestBody UserDTO userDTO) throws IOException, MessagingException {
        return this.authUserService.register(userDTO);
    } 
    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        return this.authUserService.verify(userDTO);
    }
    @PostMapping("otp/check/{code}")
    public SuccessDTO otpCheck(@PathVariable String code, @RequestBody OtpDTO otpDTO) {
        System.out.println(otpDTO);
        return this.authUserService.checkOtp(otpDTO);
    }

} 



