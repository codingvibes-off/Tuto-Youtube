package com.example.tacking.user.dto;


import java.util.UUID;

import com.example.tacking.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private UUID id;
    private String name;
    private String email;
    private String password;
    private Boolean enabled;
    public static UserDTO fromUserToUserDTO(User user){
        UserDTO userDTO = new UserDTO();
         userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        return userDTO;
    }
}