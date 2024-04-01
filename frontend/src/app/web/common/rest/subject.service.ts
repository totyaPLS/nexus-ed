import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "../state/users.repository";
import {SignUpData, User} from "../util/models/user-models";
import {ClassRepository} from "../state/classes.repository";
import {Class} from "../util/models/class-models";
import {Subject} from "../util/models/teaching-models";
import {SubjectRepository} from "../state/subjects.repository";

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
