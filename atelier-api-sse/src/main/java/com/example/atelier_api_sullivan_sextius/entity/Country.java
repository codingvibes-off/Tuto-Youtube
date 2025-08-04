package com.example.atelier_api_sullivan_sextius.entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Country {

    @JsonProperty("code")
    private String code;
    @JsonProperty("picture")
    private String picture;
}
