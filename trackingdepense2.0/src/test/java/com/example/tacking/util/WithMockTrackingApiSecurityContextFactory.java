package com.example.tacking.util;

import com.example.tacking.user.dto.UserAuthDTO;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

public class WithMockTrackingApiSecurityContextFactory
        implements WithSecurityContextFactory<WithMockTrackingUser> {

    public SecurityContext createSecurityContext(WithMockTrackingUser annotation) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        UserAuthDTO user = new UserAuthDTO();
        user.setEmail(annotation.email());
        List<SimpleGrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority("ROLE_USER"));
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(user, "password", authorities);

        context.setAuthentication(auth);
        return context;
    }
}

