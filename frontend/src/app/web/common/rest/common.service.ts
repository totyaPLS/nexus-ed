import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student, StudentRepository} from "../state/students.repository";

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private studentBase = 'http://localhost:8080/students';

    constructor(private http: HttpClient,
                private studentRepo: StudentRepository) {
    }

    /*login(): Observable<Student[]> {
        return this.http.post<Student[]>(`${this.studentBase}`).pipe(
            this.studentRepo.withRequestStatus('studentLoading', students => this.studentRepo.setStudents(students)),
        );
    }*/
}
