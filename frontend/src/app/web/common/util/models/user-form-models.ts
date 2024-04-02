import {FormControl} from "@angular/forms";
import {Role} from "../enums/Role";
import {ClassDropdown, SchoolDropdown, SubjectDropdown, UserDropdown} from "./user-models";

export interface SignUpForm {
    firstName: FormControl<string | null>,
    lastName: FormControl<string | null>,
    phone: FormControl<string | null>,
    publicEmail: FormControl<string | null>,
    schoolEmail: FormControl<string | null>,
    school: FormControl<SchoolDropdown | null>,
    residence: FormControl<string | null>,
    birthplace: FormControl<string | null>,
    birthdate: FormControl<Date | null>,
    role: FormControl<Role | null>,
    password: FormControl<string | null>
}

export interface StudentForm {
    parentControl: FormControl<UserDropdown | null>,
    classControl: FormControl<ClassDropdown | null>
}

export interface TeacherForm {
    subjectControl: FormControl<SubjectDropdown[] | null>,
    classControl: FormControl<ClassDropdown[] | null>
}
