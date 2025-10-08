package com.example.tacking.controller;

import java.security.Principal;

import com.example.tacking.util.SecurityUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.io.IOException;
import jakarta.mail.MessagingException;

import com.example.tacking.dto.AuthRequestDTO;
import com.example.tacking.dto.AuthResponseDTO;
import com.example.tacking.dto.OtpDTO;
import com.example.tacking.dto.SuccessDTO;
import com.example.tacking.dto.UserAuthDTO;
import com.example.tacking.dto.UserDTO;
import com.example.tacking.dto.UserResponseDTO;
import com.example.tacking.entity.User;
import com.example.tacking.service.AuthUserService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private AuthUserService authUserService;
    public AuthController(AuthenticationManager authenticationManager,
    AuthUserService authUserService) {
        this.authenticationManager = authenticationManager;
        this.authUserService = authUserService;
    }
    @PostMapping("/user/register")
    public UserResponseDTO register(@RequestBody UserDTO userDTO) throws IOException, MessagingException {
        return this.authUserService.register(userDTO);
    } 
    @PostMapping("/user/login")
    public AuthResponseDTO login(@RequestBody UserDTO userDTO) {
        return this.authUserService.verify(userDTO);
    }
    @PutMapping("/user/update")
    public UserDTO updateUser(@RequestBody UserDTO userDTO, Principal principal) {
        UserAuthDTO userAuth = SecurityUtil.getUserFromPrincipal(principal);
        System.out.println(userAuth);
        return this.authUserService.updateUser(userAuth.getId(), userDTO);
    }
    
    @PostMapping("/otp/check/{code}")
    public SuccessDTO otpCheck(@PathVariable String code, @RequestBody OtpDTO otpDTO) {
        return this.authUserService.checkOtp(otpDTO);
    }
} 



