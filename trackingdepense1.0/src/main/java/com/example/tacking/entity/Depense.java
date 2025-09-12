package com.example.tacking.entity;

import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Depense {
    private String id;
    private String categorie;
    private String montant;
    private String date;
    private String description;
}
