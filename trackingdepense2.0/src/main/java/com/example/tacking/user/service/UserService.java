package com.example.tacking.user.service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.tacking.email.service.MailService;
import com.example.tacking.otp.dto.OtpDTO;
import com.example.tacking.otp.entity.Otp;
import com.example.tacking.otp.exception.OtpExpiredException;
import com.example.tacking.otp.repository.OtpRepository;
import com.example.tacking.otp.util.OtpUtil;
import com.example.tacking.security.config.SecurityConfig;
import com.example.tacking.security.service.JwtService;
import com.example.tacking.user.dto.AuthResponseDTO;
import com.example.tacking.user.dto.SuccessDTO;
import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.dto.UserDTO;
import com.example.tacking.user.dto.UserResponseDTO;
import com.example.tacking.user.entity.User;
import com.example.tacking.user.exception.InvalidCredentialsException;
import com.example.tacking.user.exception.UserDisabledException;
import com.example.tacking.user.exception.UserNotFoundException;
import com.example.tacking.user.repository.UserRepository;

import io.jsonwebtoken.io.IOException;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;

@Service
public class UserService {

    private final OtpRepository otpRepository;
    
    private UserRepository userRepository;
    private SecurityConfig securityConfig;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    private MailService mailService;
    public UserService(AuthenticationManager authenticationManager,
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
    

    public UserResponseDTO register(UserDTO userDTO) throws IOException, MessagingException{
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
        .user(userRegister)
        .build();
        this.otpRepository.save(userRegisterOtp);
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

    @Transactional
    public SuccessDTO checkOtp(OtpDTO otpDTO){
        Optional<Otp> optionalOtp = otpRepository.findByUseremailAndCode(
        otpDTO.getUseremail(),
        otpDTO.getCode());

    if (optionalOtp.isPresent()) {
        Otp otpCheck = optionalOtp.get();
        if(!otpCheck.getExpiration().isAfter(LocalDateTime.now())){
            throw new OtpExpiredException("Localdate was expired");
        }
        User userEnabled = otpCheck.getUser();
        userEnabled.setEnabled(true);
        userRepository.save(userEnabled);

        otpRepository.deleteByCode(otpDTO.getCode());
        return SuccessDTO.builder()
                .success(true)
                .message("OTP validé avec succès")
                .build();
    } else {
        return SuccessDTO.builder()
                .success(false)
                .message("Code And email not validated")
                .build();
    }
   }
     public AuthResponseDTO verify(UserDTO userDTO) {
        User user = userRepository.findByEmail(userDTO.getEmail())
            .orElseThrow(() -> new UserNotFoundException("User not found"));
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userDTO.getEmail(),
                            userDTO.getPassword()
                    )
            );
            if (!authentication.isAuthenticated()) {
                throw new InvalidCredentialsException("Invalid credentials");
            }
            if(!user.getEnabled()){
                throw new UserDisabledException("User account is disabled");
            }
            UserDTO userDTOToken = UserDTO.fromUserToUserDTO(user);
            String accessToken = jwtService.generateToken(userDTOToken);
            String refreshToken = jwtService.generateRefreshToken(userDTOToken);

            return AuthResponseDTO.builder().accessToken(accessToken).refreshToken(refreshToken).build();
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid credentials"); 
        }
    }
    public UserAuthDTO getUserAuthenticated(Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new UserNotFoundException("User Not Authenticated");
        }
        return (UserAuthDTO) auth.getPrincipal();
    }


    public UserDTO updateUser(UUID userId, UserDTO userDTO) {

        return this.userRepository.findById(userId)
                .map(userUpdated -> {
                    if (Objects.nonNull(userDTO.getName())) {
                        userUpdated.setName(userDTO.getName());
                    }
                    if (Objects.nonNull(userDTO.getEmail())) {
                        userUpdated.setEmail(userDTO.getEmail());
                    }
                    if (Objects.nonNull(userDTO.getPassword())) {
                        userUpdated.setPassword(this.securityConfig.passwordEncoder().encode(userDTO.getPassword()));
                    }
                    this.userRepository.save(userUpdated);
                    return UserDTO.fromUserToUserDTO(userUpdated);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
            }

}
