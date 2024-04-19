import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ClassRepository} from "../state/classes.repository";
import {Class} from "../util/models/class-models";

@Injectable({
    providedIn: 'root',
})
export class ClassService {
    constructor(private http: HttpClient,
                private classRepo: ClassRepository) {
    }

    listClasses() {
        return this.http.get<Class[]>(`/classes`).pipe(
            this.classRepo.withRequestStatus('classes', classes => this.classRepo.setClasses(classes)),
        );
    }

    listTeacherClasses(classLevels: number[]) {
        return this.http.post<Class[]>(`/teacherClasses`, classLevels);
    }
}
