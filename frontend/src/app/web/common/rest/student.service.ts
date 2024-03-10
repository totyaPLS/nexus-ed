import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student, StudentRepository} from "../state/students.repository";

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private studentBase = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private studentRepo: StudentRepository) {
    }

    listStudents(): Observable<any> {
        /*return this.http.get<Student[]>(`${this.studentBase}`).pipe(
            this.studentRepo.withRequestStatus('studentLoading', students => this.studentRepo.setStudents(students)),
        );*/
        return this.http.get<any>(`${this.studentBase}/test`);
    }

    createStudent(student: Omit<Student, 'id'>): Observable<Student[]> {
        return this.http.post<Student[]>(`${this.studentBase}/register`, student).pipe(
            this.studentRepo.withRequestStatus('studentLoading', students => this.studentRepo.setStudents(students)),
        );
    }

    deleteStudent(studentId: number): Observable<Student[]> {
        return this.http.delete<Student[]>(`${this.studentBase}/${studentId}`).pipe(
            this.studentRepo.withRequestStatus('studentLoading', () => this.studentRepo.deleteStudent(studentId)),
        );
    }
}
