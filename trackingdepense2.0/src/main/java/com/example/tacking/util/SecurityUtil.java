package com.example.tacking.util;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.example.tacking.dto.UserAuthDTO;
import com.example.tacking.entity.User;

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
