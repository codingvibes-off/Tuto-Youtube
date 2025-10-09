package com.example.tacking.otp.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OtpDTO {
    private String code; 
    private String useremail; 
    private LocalDateTime expiration;

}
