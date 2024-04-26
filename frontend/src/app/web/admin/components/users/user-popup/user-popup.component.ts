import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {Role, ROLE_TYPE} from "../../../../common/util/enums/Role";
import {SignUpForm, StudentForm, TeacherForm} from "../../../../common/util/models/form-models";
import {
    SignUpData,
    StudentSignUp, TeacherSignUp,
    User
} from "../../../../common/util/models/user-models";
import {CalendarModule} from "primeng/calendar";
import {Class} from "../../../../common/util/models/class-models";
import {StudentCreationComponent} from "./role-creations/student-creation.component";
import {Subject} from "../../../../common/util/models/teaching-models";
import {TeacherCreationComponent} from "./role-creations/teacher-creation.component";

@Component({
  selector: 'app-user-popup',
  standalone: true,
    imports: [
        DialogModule,
        DropdownModule,
        FormsModule,
        NgClass,
        RadioButtonModule,
        InputNumberModule,
        InputTextModule,
        NgIf,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        CommonModule,
        PasswordModule,
        CheckboxModule,
        CalendarModule,
        StudentCreationComponent,
        TeacherCreationComponent,
    ],
  templateUrl: './user-popup.component.html'
})
export class UserPopupComponent implements OnInit {
    @Input() userDialog!: boolean;
    @Input() parents!: User[];
    @Input() classes!: Class[];
    @Input() subjects!: Subject[];
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveUserEvent = new EventEmitter<SignUpData>();
    @Output() saveStudentEvent = new EventEmitter<StudentSignUp>();
    @Output() saveTeacherEvent = new EventEmitter<TeacherSignUp>();

    userForm!: FormGroup<SignUpForm>;
    studentForm?: FormGroup<StudentForm>;
    teacherForm?: FormGroup<TeacherForm>;
    schools: { name: string }[] = [];

    ngOnInit(): void {
        this.userForm = new FormGroup<SignUpForm>({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            publicEmail: new FormControl('', Validators.required),
            schoolEmail: new FormControl('', Validators.required),
            school: new FormControl(null, Validators.required),
            residence: new FormControl('', Validators.required),
            birthplace: new FormControl('', Validators.required),
            birthdate: new FormControl(null, Validators.required),
            role: new FormControl(null, Validators.required),
            password: new FormControl('', Validators.required)
        });
        this.schools = [
            {name: 'Széchenyi István Gimnázium'},
            {name: 'Petőfi Sándor Általános Iskola'},
            {name: 'Budapesti Fazekas Mihály Gimnázium'}
        ];
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveUser() {
        const formValues = this.userForm.getRawValue();
        const signUpData: SignUpData = {
            firstName: formValues.firstName!,
            lastName: formValues.lastName!,
            phone: formValues.phone!,
            publicEmail: formValues.publicEmail!,
            schoolEmail: formValues.schoolEmail!,
            school: formValues.school!.name,
            residence: formValues.residence!,
            birthplace: formValues.birthplace!,
            birthdate: formValues.birthdate!,
            role: formValues.role!,
            password: formValues.password!
        };
        if (this.studentForm) {
            const studentValues: StudentSignUp = {
                ...signUpData,
                parentId: this.studentForm.controls.parentControl.value!.uid,
                classId: this.studentForm.controls.classControl.value!.id
            }
            this.saveStudentEvent.emit(studentValues);
            return;
        }
        if (this.teacherForm) {
            const teacherValues: TeacherSignUp = {
                ...signUpData,
                subjectIds: this.teacherForm.controls.subjectControl.value!.map(subject => subject.id),
                classIds: this.teacherForm.controls.classControl.value!.map(aClass => aClass.id)
            }
            this.saveTeacherEvent.emit(teacherValues);
            return;
        }
        this.saveUserEvent.emit(signUpData);
    }

    isInputInvalid(formControlName: string) {
        return this.userForm.get(formControlName)?.invalid && this.userForm.get(formControlName)?.dirty;
    }

    get selectedRole() {
        return this.userForm.controls.role.getRawValue();
    }

    studentChangeEvent(studentForm: FormGroup<StudentForm>) {
        this.studentForm = studentForm;
    }

    teacherChangeEvent(teacherForm: FormGroup<TeacherForm>) {
        this.teacherForm = teacherForm;
    }

    protected readonly Role = Role;
    protected readonly ROLE_TYPE = ROLE_TYPE;

    get formGroupIsInvalid() {
        return this.userForm.invalid || this.studentForm?.invalid || this.teacherForm?.invalid;
    }
}
