package com.example.tacking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class SuccessDTO {
    private Boolean success;
    public SuccessDTO(Boolean success) {}
}
