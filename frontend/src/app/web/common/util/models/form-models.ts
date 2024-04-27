import {FormControl} from "@angular/forms";
import {Role} from "../enums/Role";
import {ClassDropdown, SchoolDropdown, SubjectDropdown, UserDropdown} from "./user-models";
import {TaskType} from "../enums/Commons";
import {Lesson} from "./timetable-models";
import {SelectItem} from "primeng/api";

export interface SignUpForm {
    firstName: FormControl<string | null>,
    lastName: FormControl<string | null>,
    phone: FormControl<string | null>,
    publicEmail: FormControl<string | null>,
    schoolEmail: FormControl<string | null>,
    school: FormControl<SchoolDropdown | null>,
    residence: FormControl<string | null>,
    birthplace: FormControl<string | null>,
    birthdate: FormControl<string | null>,
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

export interface AnnouncementForm {
    title: FormControl<string | null>,
    description: FormControl<string | null>,
    deadline: FormControl<Date | null>,
    type: FormControl<TaskType | null>
}

export interface GradeForm {
    weight: FormControl<number | null>,
    grade: FormControl<number | null>,
}

export interface AbsenceForm {
    user: FormControl<UserDropdown | null>,
    lesson: FormControl<Lesson | null>,
    status: FormControl<SelectItem | null>,
}
