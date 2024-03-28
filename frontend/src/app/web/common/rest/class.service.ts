import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "../state/users.repository";
import {SignUpData, User} from "../util/models/user-models";
import {ClassRepository} from "../state/classes.repository";
import {Class} from "../util/models/class-models";

@Injectable({
    providedIn: 'root',
})
export class ClassService {
    private base = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private classRepo: ClassRepository) {
    }

    listClasses() {
        return this.http.get<Class[]>(`${this.base}/classes`).pipe(
            this.classRepo.withRequestStatus('classes', classes => this.classRepo.setClasses(classes)),
        );
    }
}
