import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {CustomJwtPayload} from "../web/common/util/models/custom-jwt-payload";

@Injectable({providedIn: 'root'})
export class TokenService {
    private tokenKey = 'auth_token';

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

    isTokenExpired() {
        const token = this.getToken();
        if (!token) return true;

        const decodedCredential = jwtDecode<CustomJwtPayload>(token);
        const expirationDate = new Date(decodedCredential.exp * 1000);
        return expirationDate <= new Date();
    }
}
