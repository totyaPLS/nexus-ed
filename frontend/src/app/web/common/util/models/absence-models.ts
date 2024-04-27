import {AbsenceStatus} from "../enums/Commons";

export interface Absence {
    id: number;
    studentId: string;
    firstName: string;
    lastName: string;
    lessonId: number;
    absenceDate: string;
    classId: number;
    subjectId: number;
    status: string;
    modificationDate: string;
}

export interface AbsenceReq {
    studentId: string;
    lessonId: number;
    status: AbsenceStatus;
    classId: number;
    subjectId: number;
}
