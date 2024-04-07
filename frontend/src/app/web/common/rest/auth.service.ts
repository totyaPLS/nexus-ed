import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Credentials} from "../util/models/auth-models";
import {User} from "../util/models/user-models";
import {Role} from "../util/enums/Role";
import {el} from "@fullcalendar/core/internal-common";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loginBase = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private router: Router) {
    }

    getAuthToken(): string | null {
        return sessionStorage.getItem('auth_token');
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
