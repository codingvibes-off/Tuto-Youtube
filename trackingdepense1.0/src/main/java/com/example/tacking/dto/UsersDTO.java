package com.example.tacking.dto;

import java.util.List;

import lombok.Builder;

@Builder
public class UsersDTO {
    private List<UsersDTO> userDTO;
}