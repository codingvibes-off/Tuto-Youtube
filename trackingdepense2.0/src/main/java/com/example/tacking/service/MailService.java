package com.example.tacking.service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import org.springframework.core.io.ClassPathResource;
//import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.IOException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public MimeMessage sendOtpEmail(String toEmail, String otpCode) throws MessagingException, IOException {
        MimeMessage mimeMessage = mailSender.createMimeMessage(); 
        
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8"); 
        helper.setTo(toEmail); 
        helper.setSubject("Votre code OTP"); 

        ClassPathResource resource = new ClassPathResource("templates/otp-template.html");
        String htmlTemplate;
        try {
            htmlTemplate = Files.readString(resource.getFile().toPath(), StandardCharsets.UTF_8);
            
            String otpLink = "http://localhost:8080/otp/check?code=" + otpCode; 
            String htmlBody = htmlTemplate.replace("{{otpCode}}", otpCode) .replace("{{otpLink}}", otpLink); 
            
            helper.setText(htmlBody, true); 
            mailSender.send(mimeMessage); 
         
        } catch (java.io.IOException e) {
            e.printStackTrace();
        } 
           return mimeMessage; 
        }
}
