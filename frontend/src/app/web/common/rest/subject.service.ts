import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "../util/models/teaching-models";
import {SubjectRepository} from "../state/subjects.repository";
import {Lesson} from "../util/models/timetable-models";

@Injectable({
    providedIn: 'root',
})
export class SubjectService {
    private base = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private subjectRepo: SubjectRepository) {
    }

    listAvailableSubjects() {
        return this.http.get<Subject[]>(`${this.base}/availableSubjects`).pipe(
            this.subjectRepo.withRequestStatus('subjects', subjects => this.subjectRepo.setSubjects(subjects)),
        );
    }
}
