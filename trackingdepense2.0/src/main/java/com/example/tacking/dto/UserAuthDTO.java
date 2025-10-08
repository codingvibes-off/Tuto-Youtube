package com.example.tacking.dto;

import com.example.tacking.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

/**
 * @author Sullivan Sextans
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserAuthDTO {
    private UUID id;
    private String email;

    public static UserAuthDTO userFromUserAuthDto(User user){
        UserAuthDTO userAuthDTO = new UserAuthDTO();
        userAuthDTO.setId(user.getId());
        userAuthDTO.setEmail(user.getEmail());
        return userAuthDTO;
    }
}
