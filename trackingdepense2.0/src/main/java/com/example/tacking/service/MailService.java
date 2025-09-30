package com.example.tacking.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public SimpleMailMessage sendOtpEmail(String toEmail, String otpCode) {
        
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(toEmail);
        simpleMailMessage.setSubject("Votre code OTP");
        simpleMailMessage.setText("Bonjour !\n\nVotre code OTP est : " + otpCode + "\nIl expire dans 5 minutes.");
        mailSender.send(simpleMailMessage);
        
        return simpleMailMessage;
    }
}
