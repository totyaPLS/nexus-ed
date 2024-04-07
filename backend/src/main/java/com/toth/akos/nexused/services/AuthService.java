package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private UserDTO getPrincipal() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (UserDTO) auth.getPrincipal();
    }

    public String getPrincipalUid() {
        return getPrincipal().getUid();
    }

    public Role getPrincipalRole() {
        return getPrincipal().getRole();
    }
}
