import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Credentials} from "../util/models/auth-models";
import {User} from "../util/models/user-models";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loginBase = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private router: Router) {
    }

    getAuthToken(): string | null {
        return window.localStorage.getItem('auth_token');
    }

    setAuthToken(token: string | null): void {
        if (token !== null) {
            window.localStorage.setItem('auth_token', token);
        } else {
            window.localStorage.removeItem('auth_token');
        }
    }

    login(credentials: Credentials): Observable<User> {
        let users$ = this.http.post<User>(`${this.loginBase}/login`, credentials);
        users$.subscribe(response => {
            this.setAuthToken(response.token);
            this.router.navigate(['/users']);
        });
        return users$;
    }
}
