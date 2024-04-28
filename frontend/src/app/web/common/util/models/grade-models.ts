import {GradeType, WeightType} from "../enums/Commons";

export interface YearGradesForStudent {
    id: number;
    studentId: string;
    studentName: string;
    teacherId: string;
    subjectId: number;
    classId: number;
    gradesPerMonth: MonthGradeMap[];
}

export interface MonthGradeMap {
    date: string;
    gradeValues: Grade[];
}

export interface Grade {
    id: number;
    studentId: string;
    teacherId: string;
    gradeValue: GradeType;
    weight: WeightType;
    subjectId: number;
    classId: number;
    created: string;
}

export interface TaskGradeReq {
    studentId: string;
    grade: GradeType;
    weight: WeightType;
    subjectId?: number;
    classId?: number;
    subTaskId: number;
}
