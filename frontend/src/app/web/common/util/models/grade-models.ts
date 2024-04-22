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
