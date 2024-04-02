import {Class} from "./class-models";
import {Subject} from "./teaching-models";

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

export type SignUpData = Omit<User, 'uid' | 'online' | 'token'>;

export interface StudentSignUp extends SignUpData {
    parentId: string;
    classId: number;
}

export interface TeacherSignUp extends SignUpData {
    subjectIds: number[];
    classIds: number[];
}

export interface UserDropdown extends Pick<User, 'uid' | 'firstName' | 'lastName'> {
    dropDownValue: string;
}

export interface ClassDropdown extends Class {
    dropDownValue: string;
}

export interface SubjectDropdown extends Subject {
    dropDownValue: string;
}

export interface SchoolDropdown {
    name: string;
}


