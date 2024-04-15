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

export function getEnumName<T extends string>(
    value: T | null,
    enumMap: Record<T, string>
): string {
    return value ? enumMap[value] : '';
}

