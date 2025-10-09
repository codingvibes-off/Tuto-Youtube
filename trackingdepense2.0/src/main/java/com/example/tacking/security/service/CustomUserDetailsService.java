package com.example.tacking.security.service;


import com.example.tacking.user.dto.UserAuthDTO;
import com.example.tacking.user.entity.User;
import com.example.tacking.user.entity.UserPrincipal;
import com.example.tacking.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("User not found with email: " + email);
                });
        //UserAuthDTO userAuthDTO = UserAuthDTO.userFromUserAuthDto(user);
        return new UserPrincipal(user);
    }
}