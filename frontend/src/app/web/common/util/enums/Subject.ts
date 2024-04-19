export enum TaskType {
    OPTIONAL = 'OPTIONAL',
    HOMEWORK = 'HOMEWORK',
    TEST = 'TEST',
}

export const TASK_TYPE = {
    [TaskType.OPTIONAL]: 'Szorgalmi',
    [TaskType.HOMEWORK]: 'Házi feladat',
    [TaskType.TEST]: 'Dolgozat',
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

export function getEnumName<T extends string>(
    value: T | null,
    enumMap: Record<T, string>
): string {
    return value ? enumMap[value] : '';
}

