import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "../util/models/teaching-models";
import {SubjectRepository} from "../state/subjects.repository";
import {SubjectMenuRepository} from "../state/subject-menus.repository";
import {SubjectMenuItem} from "../util/models/menu-models";
import {catchError, EMPTY} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SubjectService {
    private base = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private subjectRepo: SubjectRepository,
                private subjectMenuRepo: SubjectMenuRepository) {
    }

    listAvailableSubjects() {
        return this.http.get<Subject[]>(`${this.base}/availableSubjects`).pipe(
            this.subjectRepo.withRequestStatus('subjects', subjects => this.subjectRepo.setSubjects(subjects)),
        );
    }

    listSubjectsForMenu() {
        return this.http.get<SubjectMenuItem[]>(`${this.base}/subjects`).pipe(
            this.subjectMenuRepo.withRequestStatus(
                'menuItems',
                items => this.subjectMenuRepo.setMenuItems(items)),
            // this.subjectMenuRepo.skipWhileCached('menuItems'),
            catchError(() => EMPTY),
        );
    }
}
