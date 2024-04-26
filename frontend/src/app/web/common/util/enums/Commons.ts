export enum TaskType {
    OPTIONAL = 'OPTIONAL',
    HOMEWORK = 'HOMEWORK',
    TEST = 'TEST',
    FINAL = 'FINAL',
}

export const TASK_TYPE = {
    [TaskType.OPTIONAL]: 'Szorgalmi',
    [TaskType.HOMEWORK]: 'Házi feladat',
    [TaskType.TEST]: 'Dolgozat',
    [TaskType.FINAL]: 'Témazáró',
};

export enum AbsenceStatus {
    EXCUSED = 'EXCUSED',
    UNEXCUSED = 'UNEXCUSED',
    PENDING = 'PENDING',
}

export const ABSENCE_STATUS = {
    [AbsenceStatus.EXCUSED]: 'Igazolt',
    [AbsenceStatus.UNEXCUSED]: 'Igazolatlan',
    [AbsenceStatus.PENDING]: 'Igazolásra vár',
};

export enum SubjectDetailType {
    ANNOUNCEMENTS = 'announcements',
    TASKS = 'tasks',
    ABSENCES = 'absences',
    GRADES = 'grades',
}

export const DETAIL = {
    [SubjectDetailType.ANNOUNCEMENTS]: 'Közlemények',
    [SubjectDetailType.TASKS]: 'Feladatok',
    [SubjectDetailType.ABSENCES]: 'Hiányzások',
    [SubjectDetailType.GRADES]: 'Értékelések',
};

export enum GradeType {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
}

export const GRADE_TYPE = {
    [GradeType.ONE]: 'one',
    [GradeType.TWO]: 'two',
    [GradeType.THREE]: 'three',
    [GradeType.FOUR]: 'four',
    [GradeType.FIVE]: 'five',
};

export enum WeightType {
    HALF = 0.5,
    ONE = 1,
    ONE_AND_HALF = 1.5,
    TWO = 2,
}

export function getEnumName<T extends string>(
    value: T | null,
    enumMap: Record<T, string>
): string {
    return value ? enumMap[value] : '';
}

