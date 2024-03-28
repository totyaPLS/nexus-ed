import {Class} from "./class-models";

export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    phone: string;
    publicEmail: string;
    schoolEmail: string;
    school: string;
    residence: string;
    birthplace: string;
    birthdate: Date;
    role: string;
    online: boolean;
    password: string;
    token: string;
}

export interface SignUpData extends Omit<User, 'uid' | 'online' | 'token'> {
    parentId: string;
    classId: number;
}

export interface ParentDropdown extends Pick<User, 'uid' | 'firstName' | 'lastName'> {
    dropDownValue: string;
}

export interface ClassDropdown extends Class {
    dropDownValue: string;
}
