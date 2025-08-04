package com.example.atelier_api_sullivan_sextius.dto;

import com.example.atelier_api_sullivan_sextius.entity.StatsData;
import com.fasterxml.jackson.annotation.JsonInclude;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class PlayerDTO {
    @NotBlank
    @JsonProperty("id")
    private Long id;
    @NotBlank
    @JsonProperty("firstname")
    private String firstName;
    @NotBlank
    @JsonProperty("lastname")
    private String lastName;
    @NotBlank
    @JsonProperty("sex")
    private String sex;
    @JsonProperty("shortname")
    private String shortName;
    @JsonProperty("picture")
    private String picture;
    @JsonProperty("country")
    private CountryDTO country;
    @JsonProperty("data")
    private StatsData data;

}
