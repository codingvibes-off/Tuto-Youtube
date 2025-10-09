package com.example.tacking.category.entity;

import java.sql.Date;
import java.util.UUID;

import com.example.tacking.category.dto.CategoryDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @Column(name = "id", columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id; 
    @Column(name = "date", nullable = false)
    private Date date;
    @Column(name = "label", nullable = false)
    private String label;

       public static Category fromDTOToCategory(CategoryDTO dto) {
        if (dto == null) return null;
         Category category = new Category();
            category.setLabel(dto.getLabel());
             if (dto.getDate() != null) {
                category.setDate(new java.sql.Date(dto.getDate().getTime()));
            }
            return category;
    }
}
