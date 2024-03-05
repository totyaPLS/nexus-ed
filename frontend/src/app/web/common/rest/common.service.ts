import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentRepository} from "../state/students.repository";

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private loginBase = 'http://localhost:8080/login';

    constructor(private http: HttpClient,
                private studentRepo: StudentRepository) {
    }

    login(): Observable<any[]> {
        return this.http.post<any[]>(`${this.loginBase}`, {});
    }
}
