package com.example.tacking.expense.dto;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import com.example.tacking.category.dto.CategoryDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExpenseDTO {
    private UUID id;
    @NotNull(message = "The category must be required")
    private CategoryDTO categoryDTO; 
    @NotNull(message = "The amount must be required")
    private Double amount;
    @NotNull(message = "The date must be required")
    private LocalDate date;
    @NotNull(message = "The description must be required")
    private String description;
}
