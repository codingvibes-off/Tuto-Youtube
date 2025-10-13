package com.example.tacking.expense.service;

import com.example.tacking.category.dto.CategoryDTO;
import com.example.tacking.category.entity.Category;
import com.example.tacking.category.repository.CategoryRepository;
import com.example.tacking.expense.dto.ExpenseDTO;
import com.example.tacking.expense.entity.Expense;
import com.example.tacking.expense.repository.ExpenseRepository;
import com.example.tacking.user.dto.SuccessDTO;
import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.dto.UserDTO;
import com.example.tacking.user.exception.UserNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class ExpenseService {
  private static ExpenseRepository expenseRepository;
  private static CategoryRepository categoryRepository;
    ExpenseService(ExpenseRepository expenseRepository ){
      this.expenseRepository = expenseRepository;
    }
    public List<Expense> getAllExpense(){
      return this.expenseRepository.findAll();
    }
    public Optional<Expense> getExpense(UUID id) {
        return this.expenseRepository.findById(id);
    }
    public ExpenseDTO postExpense(ExpenseDTO expenseDTO, UserAuthDTO userAuthDTO) {
        if (userAuthDTO == null) {
                throw new UserNotFoundException("User not found or not authenticated");
        }
        if (expenseDTO.getAmount() == null) {
            throw new RuntimeException("Le montant est obligatoire !");
        }
        if (expenseDTO.getDate() == null) {
            throw new RuntimeException("La date est obligatoire !");
        }
        if (expenseDTO.getCategoryDTO() == null) {
            throw new RuntimeException("La catégorie est obligatoire !");
        }

        Category category = this.categoryRepository.findByLabel(expenseDTO.getCategoryDTO().getLabel())
                    .orElseThrow(() -> new RuntimeException("Categorie not found"));

        Expense expense = Expense.builder()
                .category(category)
                .amount(expenseDTO.getAmount())
                .date(expenseDTO.getDate())
                .description(Optional.ofNullable(expenseDTO.getDescription()).orElse(""))
                .build();

        Expense savedExpense = expenseRepository.save(expense);

        return ExpenseDTO.builder()
                .categoryDTO(CategoryDTO.fromCategoryToDTO(savedExpense.getCategory()))
                .amount(savedExpense.getAmount())
                .date(savedExpense.getDate())
                .description(savedExpense.getDescription())
                .build();
}


    public Expense putExpense(@PathVariable UUID id, @RequestBody Expense updatedExpense) {
    Expense expense = this.expenseRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Expense not found"));
        expense.setAmount(updatedExpense.getAmount());
        expense.setDescription(updatedExpense.getDescription());
        expense.setDate(updatedExpense.getDate());
        expense.setCategory(updatedExpense.getCategory());
        return this.expenseRepository.save(expense);
}

public SuccessDTO deleteExpense(@PathVariable UUID id) {
    Expense expense = this.expenseRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Expense not found"));

    this.expenseRepository.deleteById(expense.getId());
    return SuccessDTO.builder()
    .success(true)
    .message("Expense deleted Succesfull !").build();
}

}