package com.example.tacking.user.controller;

import java.security.Principal;

import com.example.tacking.web.UrlMapping;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.io.IOException;
import jakarta.mail.MessagingException;

import com.example.tacking.otp.dto.OtpDTO;
import com.example.tacking.security.util.SecurityUtil;
import com.example.tacking.user.dto.AuthResponseDTO;
import com.example.tacking.user.dto.SuccessDTO;
import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.dto.UserDTO;
import com.example.tacking.user.dto.UserResponseDTO;
import com.example.tacking.user.service.UserService;

import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping(UrlMapping.API_BASE_PATH)
public class UserController {
    private UserService authUserService;
    public UserController(AuthenticationManager authenticationManager,
    UserService authUserService) {
        this.authUserService = authUserService;
    }
    @PostMapping(UrlMapping.USER + UrlMapping.REGISTER)
    public UserResponseDTO register(@RequestBody UserDTO userDTO) throws IOException, MessagingException {
        return this.authUserService.register(userDTO);
    } 
    @PostMapping(UrlMapping.USER + UrlMapping.LOGIN)
    public AuthResponseDTO login(@RequestBody UserDTO userDTO) {
        return this.authUserService.verify(userDTO);
    }
    @PutMapping(UrlMapping.USER + UrlMapping.UPDATE)
    public UserDTO updateUser(@RequestBody UserDTO userDTO, Principal principal) {
        UserAuthDTO userAuth = SecurityUtil.getUserFromPrincipal(principal);
        
        return this.authUserService.updateUser(userAuth.getId(), userDTO);
    }
    @PostMapping(UrlMapping.OTP + UrlMapping.CHECK + UrlMapping.CODE)
    public SuccessDTO otpCheck(@PathVariable String code, @RequestBody OtpDTO otpDTO) {
        return this.authUserService.checkOtp(otpDTO);
    }
} 



