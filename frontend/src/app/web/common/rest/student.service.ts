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

    listStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.studentBase}`).pipe(
            this.studentRepo.withRequestStatus('studentLoading', students => this.studentRepo.setStudents(students)),
        );
    }

    createStudent(student: Student): Observable<Student[]> {
        return this.http.delete<Student[]>(`${this.studentBase}/${student}`).pipe(
            this.studentRepo.withRequestStatus('studentLoading', () => this.studentRepo.addStudent(student)),
        );
    }

    deleteStudent(studentId: number): Observable<Student[]> {
        return this.http.delete<Student[]>(`${this.studentBase}/${studentId}`).pipe(
            this.studentRepo.withRequestStatus('studentLoading', () => this.studentRepo.deleteStudent(studentId)),
        );
    }
}
