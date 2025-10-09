package com.example.tacking.expense.dto;

import java.sql.Date;
import java.util.UUID;

import com.example.tacking.category.dto.CategoryDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseDTO {
    private UUID id;
    private CategoryDTO categoryDTO; 
    private Double amount;
    private Date date;
    private String description;
}
