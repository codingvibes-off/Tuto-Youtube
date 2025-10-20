package com.example.tacking.security.util;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.example.tacking.user.dto.UserAuthDTO;

import java.security.Principal;
/**
 * @author Sullivan Sextius on 23/01/2025
 */
public class SecurityUtil {

    private SecurityUtil(){}

    public static UserAuthDTO getUserFromPrincipal(Principal principal){
        return (principal instanceof UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken && usernamePasswordAuthenticationToken.getPrincipal() instanceof UserAuthDTO userAuthDTO) ? userAuthDTO : null;
    }

    public static Object getPrincipal(Principal principal){
        return principal instanceof UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken ? usernamePasswordAuthenticationToken.getPrincipal() : null;
    }
}
