package com.example.tacking.category.dto;

import java.util.Date;
import java.util.UUID;

import com.example.tacking.category.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private UUID id;
    private Date date;
    private String label;
    public static CategoryDTO fromCategoryToDTO(Category category) {
        if (category == null) return null;

        CategoryDTO dto = new CategoryDTO();
        dto.setLabel(category.getLabel());
        dto.setDate(category.getDate());
        return dto;
    }


}

