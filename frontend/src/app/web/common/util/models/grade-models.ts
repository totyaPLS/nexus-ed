import {GradeType, WeightType} from "../enums/Commons";

export interface YearGradesForStudent {
    id: number;
    studentId: string;
    studentName: string;
    teacherId: string;
    subjectId: number;
    classId: number;
    gradesPerMonth: GradeData[][];
}

export interface GradeData {
    created: string;
    grade: number;
    weight: number;
}

export interface TaskGradeReq {
    studentId: string;
    grade: GradeType;
    weight: WeightType;
    subjectId?: number;
    classId?: number;
    subTaskId: number;
}
