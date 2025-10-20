package com.example.tacking.category.controller;

import com.example.tacking.category.dto.CategoryDTO;
import com.example.tacking.category.service.CategoryService;
import com.example.tacking.user.dto.SuccessDTO;
import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.exception.UserNotFoundException;
import com.example.tacking.security.util.SecurityUtil;
import com.example.tacking.web.UrlMapping;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(UrlMapping.API_BASE_PATH + UrlMapping.CATEGORY)
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    /**
     *  CREATE — crée une nouvelle catégorie
     */
    @PostMapping
    public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDTO, Principal principal) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if (userAuthDTO == null) {
            throw new UserNotFoundException("User not found");
        }
        return categoryService.createCategory(categoryDTO);
    }
    /**
     *  READ — récupère une catégorie par ID
     */
    @GetMapping("/{id}")
    public CategoryDTO getCategoryById(@PathVariable UUID id, Principal principal) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if (userAuthDTO == null) {
            throw new UserNotFoundException("User not found");
        }

        return categoryService.getCategoryById(id);
    }
    /**
     *  READ ALL — liste toutes les catégories
     */
    @GetMapping
    public List<CategoryDTO> getAllCategories(Principal principal) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if (userAuthDTO == null) {
            throw new UserNotFoundException("User not found");
        }
        return categoryService.getAllCategories();
    }

    /**
     * met à jour une catégorie existante
     */
    @PutMapping("/{id}")
    public CategoryDTO updateCategory(@PathVariable UUID id, @RequestBody CategoryDTO categoryDTO, Principal principal) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if (userAuthDTO == null) {
            throw new UserNotFoundException("User not found");
        }
        return categoryService.updateCategory(id, categoryDTO);
    }
    /**
     * DELETE — supprime une catégorie
     */
    @DeleteMapping("/{id}")
    public SuccessDTO deleteCategory(@PathVariable UUID id, Principal principal) {
        UserAuthDTO userAuthDTO = SecurityUtil.getUserFromPrincipal(principal);
        if (userAuthDTO == null) {
            throw new UserNotFoundException("User not found");
        }
        return categoryService.deleteCategory(id);
    }
}
