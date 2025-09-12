package com.example.tacking.dto;

import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class DepenseDTO {
    private String categorie; 
    private String montant;
    private DateTimeFormatter date;
    private String description;
}
