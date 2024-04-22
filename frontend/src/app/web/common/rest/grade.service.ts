import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GradeRepository} from "../state/grades.repository";
import {YearGradesForStudent} from "../util/models/grade-models";

@Injectable({
    providedIn: 'root',
})
export class GradeService {
    constructor(private http: HttpClient,
                private gradeRepo: GradeRepository) {
    }

    listClassGrades(subjectId: number, classId: number) {
        return this.http.get<YearGradesForStudent[]>(`/classGrades/${subjectId}/${classId}`).pipe(
            this.gradeRepo.withRequestStatus('grades', grades => this.gradeRepo.setGrades(grades)),
        );
    }
}
