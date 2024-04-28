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

    listBlockAbsences(subjectId: number, classId: number) {
        return this.http.get<Absence[]>(`/listBlockAbsences/${subjectId}/${classId}`).pipe(
            this.absenceRepo.withRequestStatus('absences', absences => this.absenceRepo.setAbsences(absences)),
        );
    }

    listAllAbsences(subjectId: number, classId: number) {
        return this.http.get<Absence[]>(`/listAllAbsences/${subjectId}/${classId}`).pipe(
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
