package com.example.atelier_api_sullivan_sextius.dto;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PlayerStatsDTO {
    private String topCountryByWinRatio;
    private double averageBmi;
    private double medianHeight;
}
