import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {CustomJwtPayload} from "../web/common/util/models/custom-jwt-payload";
import {Credentials} from "../web/common/util/models/auth-models";
import {Observable} from "rxjs";
import {User} from "../web/common/util/models/user-models";
import {Role} from "../web/common/util/enums/Role";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class TokenService {
    private tokenKey = 'auth_token';
    private loginBase = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private router: Router) {
    }

    setToken(token: string) {
        sessionStorage.setItem(this.tokenKey, token);
    }

    getToken() {
        return sessionStorage.getItem(this.tokenKey);
    }

    removeToken() {
        sessionStorage.removeItem(this.tokenKey);
    }

    isTokenExpired() {
        const token = this.getToken();
        if (!token) return true;

        const decodedCredential = jwtDecode<CustomJwtPayload>(token);
        const expirationDate = new Date(decodedCredential.exp * 1000);
        return expirationDate <= new Date();
    }

    setAuthToken(token: string | null): void {
        if (token !== null) {
            sessionStorage.setItem('auth_token', token);
        } else {
            sessionStorage.removeItem('auth_token');
        }
    }

    login(credentials: Credentials): Observable<User> {
        let users$ = this.http.post<User>(`${this.loginBase}/login`, credentials);
        users$.subscribe(response => {
            this.setAuthToken(response.token);
            if (response.role === Role.ADMIN) {
                this.router.navigate(['/users']);
            } else {
                this.router.navigate(['/timetable']);
            }
        });
        return users$;
    }
}
