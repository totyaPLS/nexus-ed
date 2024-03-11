export enum Role {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    FORM_TEACHER = 'FORM_TEACHER'
}

export const ROLE_TYPE = {
    [Role.ADMIN]: 'Admin',
    [Role.STUDENT]: 'Student',
    [Role.TEACHER]: 'Teacher',
    [Role.FORM_TEACHER]: 'Teacher & Form teacher',
} as const;

export function getRoleName(value: Role | null) {
    return value ? ROLE_TYPE[value] : '';
}
