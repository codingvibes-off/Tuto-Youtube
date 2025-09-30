package com.example.tacking.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OtpDTO {
    private String code; 
    private String useremail; 
    private LocalDateTime expiration;

}
