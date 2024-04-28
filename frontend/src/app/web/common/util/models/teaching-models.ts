export interface Subject {
    id: number;
    name: string;
    classDifficulty: number;
}

export interface Teaching {
    id: number;
    teacherId: string;
    subjectId: number;
    classId: number;
}
