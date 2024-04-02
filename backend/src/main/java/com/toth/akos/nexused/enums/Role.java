package com.toth.akos.nexused.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,
    STUDENT,
    PARENT,
    TEACHER;

    @Override
    public String getAuthority() {
        return this.name();
    }
}
