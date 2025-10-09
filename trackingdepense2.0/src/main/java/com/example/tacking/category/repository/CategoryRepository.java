package com.example.tacking.category.repository;


import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tacking.category.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

}