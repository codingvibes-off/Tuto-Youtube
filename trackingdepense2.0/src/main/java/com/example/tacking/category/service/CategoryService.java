package com.example.tacking.category.service;

import com.example.tacking.category.dto.CategoryDTO;
import com.example.tacking.category.entity.Category;
import com.example.tacking.category.exception.CategoryDeletionException;
import com.example.tacking.category.exception.CategoryNotFoundException;
import com.example.tacking.category.repository.CategoryRepository;
import com.example.tacking.expense.repository.ExpenseRepository;
import com.example.tacking.user.dto.SuccessDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
public class CategoryService {
    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private final ExpenseRepository expenseRepository;
    CategoryService(CategoryRepository categoryRepository, ExpenseRepository expenseRepository){
      this.categoryRepository = categoryRepository;
      this.expenseRepository = expenseRepository;
    }
    /**
     * Crée une nouvelle catégorie.
     */
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        if (categoryDTO.getLabel() == null || categoryDTO.getLabel().isBlank()) {
            throw new CategoryNotFoundException("Category label is required");
        }
        LocalDate categoryDate = categoryDTO.getDate() != null
        ? categoryDTO.getDate()
        : LocalDate.now();

        Category category = Category.builder()
                .label(categoryDTO.getLabel())
                .date(categoryDate)
                .version(0L)
                .build();
        Category saved = categoryRepository.save(category);
        return CategoryDTO.fromCategoryToDTO(saved);
    }

    /**
     * Récupère une catégorie par son identifiant.
     */
    public CategoryDTO getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + id));
        return CategoryDTO.fromCategoryToDTO(category);
    }

    /**
     * Récupère toutes les catégories.
     */
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryDTO::fromCategoryToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Met à jour une catégorie existante.
     */
    public CategoryDTO updateCategory(UUID id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + id));
        category.setLabel(categoryDTO.getLabel());
        Category updated = categoryRepository.save(category);
        return CategoryDTO.fromCategoryToDTO(updated);
    }

    /**
     * Supprime une catégorie par son identifiant.
     */
    public SuccessDTO deleteCategory(UUID id) {
        Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + id));
        if (!expenseRepository.findByCategory(category).isEmpty()) {
            throw new CategoryDeletionException("Cannot delete category: it is still referenced by expenses.");
        }
        categoryRepository.deleteById(category.getId());
        return SuccessDTO.builder()
        .message("Category deleted successfully")
        .success(true)
        .build();
     
   
    }
}
