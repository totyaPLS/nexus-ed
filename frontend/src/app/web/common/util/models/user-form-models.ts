import {FormControl} from "@angular/forms";
import {Role} from "../enums/Role";

export interface SignUpForm {
    firstName: FormControl<string | null>,
    lastName: FormControl<string | null>,
    /*phone: FormControl<string | null>,
    publicEmail: FormControl<string | null>,
    schoolEmail: FormControl<string | null>,
    school: FormControl<string | null>,
    residence: FormControl<string | null>,
    birthplace: FormControl<string | null>,
    birthdate: FormControl<Date | null>,*/
    role: FormControl<Role | null>,
    password: FormControl<string | null>,
    parentId: FormControl<string | null>,
    classId: FormControl<number | null>
}
