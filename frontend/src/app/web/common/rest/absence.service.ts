import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AbsenceRepository} from "../state/absences.repository";
import {Absence, AbsenceReq} from "../util/models/absence-models";

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

    listAbsences(subjectId: number, classId: number) {
        return this.http.get<Absence[]>(`/absences/${subjectId}/${classId}`).pipe(
            this.absenceRepo.withRequestStatus('absences', absences => this.absenceRepo.setAbsences(absences)),
        );
    }

    deleteAbsence(id: number) {
        return this.http.delete<number>(`/deleteAbsence/${id}`).pipe(
            this.absenceRepo.withRequestStatus(
                'absences',
                absencesId => this.absenceRepo.deleteAbsence(absencesId),
            )
        );
    }

    uploadAbsence(absenceReq: AbsenceReq) {
        return this.http.post<Absence>(`/uploadAbsence`, absenceReq).pipe(
            this.absenceRepo.withRequestStatus(
                'absences',
                absence => this.absenceRepo.upsertAbsences(absence),
            )
        );
    }
}
