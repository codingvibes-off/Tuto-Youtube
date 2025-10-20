package com.example.tacking.expense.service;

import com.example.tacking.category.dto.CategoryDTO;
import com.example.tacking.category.entity.Category;
import com.example.tacking.category.repository.CategoryRepository;
import com.example.tacking.expense.dto.ExpenseDTO;
import com.example.tacking.expense.entity.Expense;
import com.example.tacking.expense.exception.ExpenseValidationException;
import com.example.tacking.expense.repository.ExpenseRepository;
import com.example.tacking.user.dto.SuccessDTO;
import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.entity.User;
import com.example.tacking.user.exception.UserNotFoundException;
import com.example.tacking.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class ExpenseService {

    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    ExpenseService(ExpenseRepository expenseRepository , UserRepository userRepository,  CategoryRepository categoryRepository){
      this.expenseRepository = expenseRepository;
      this.userRepository = userRepository;
      this.categoryRepository = categoryRepository;
    }
    public List<Expense> getAllExpense(){
      return this.expenseRepository.findAll();
    }
    public Optional<Expense> getExpense(UUID id) {
        return this.expenseRepository.findById(id);
    }
    public ExpenseDTO postExpense(ExpenseDTO expenseDTO, UserAuthDTO userAuthDTO) {
        User user = Optional.ofNullable(userAuthDTO)
        .map(UserAuthDTO::getId)
        .flatMap(userRepository::findById)
        .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (expenseDTO.getAmount() == null) {
            throw new ExpenseValidationException("The amount must be required");
        }
        if (expenseDTO.getDate() == null) {
            throw new ExpenseValidationException("The date must be required");
        }
        if (expenseDTO.getCategoryDTO() == null) {
            throw new ExpenseValidationException("The category must be required");
        }
        Category category = this.categoryRepository.findById(expenseDTO.getCategoryDTO().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));      
        Expense expense = Expense.builder()
                .category(category)
                .amount(expenseDTO.getAmount())
                .date(expenseDTO.getDate())
                .user(user)
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