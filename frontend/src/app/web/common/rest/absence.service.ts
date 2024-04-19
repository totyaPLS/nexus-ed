import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AbsenceRepository} from "../state/absences.repository";
import {Absence} from "../util/models/absence-models";

@Injectable({
    providedIn: 'root',
})
export class AbsenceService {
    constructor(private http: HttpClient,
                private absenceRepo: AbsenceRepository) {
    }

    listTeacherAbsences(subjectId: number, classId: number) {
        return this.http.get<Absence[]>(`/teacherAbsences/${subjectId}/${classId}`).pipe(
            this.absenceRepo.withRequestStatus('absences', absences => this.absenceRepo.setAbsences(absences)),
        );
    }
}
