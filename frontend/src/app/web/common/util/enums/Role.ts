export enum Role {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    PARENT = 'PARENT',
    TEACHER = 'TEACHER'
}

export const ROLE_TYPE = {
    [Role.ADMIN]: 'Admin',
    [Role.STUDENT]: 'Tanuló',
    [Role.PARENT]: 'Szülő',
    [Role.TEACHER]: 'Tanár'
} as const;

export function getRoleName(value: Role | null) {
    return value ? ROLE_TYPE[value] : '';
}
