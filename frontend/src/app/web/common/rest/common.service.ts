import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserRepository} from "../state/users.repository";

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private loginBase = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private studentRepo: UserRepository) {
    }

    login(): Observable<any[]> {
        return this.http.post<any[]>(`${this.loginBase}`, {});
    }
}
