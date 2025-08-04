package com.example.atelier_api_sullivan_sextius.entity;

import com.example.atelier_api_sullivan_sextius.dto.CountryDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Player {
    private Long id;
    @JsonProperty("firstname")
    private String firstName;
    @JsonProperty("lastname")
    private String lastName;
    @JsonProperty("sex")
    private String sex;
    @JsonProperty("shortname")
    private String shortName;
    @JsonProperty("picture")
    private String picture;
    @JsonProperty("country")
    private Country country;
    @JsonProperty("data")
    private StatsData data;

    public Player() {

    }
    public static Country convertCountryDTOToCountry(CountryDTO dto) {
            if (dto == null) {
                return null;
            }
            return new Country(dto.getCode(), dto.getPicture());
        }


}
