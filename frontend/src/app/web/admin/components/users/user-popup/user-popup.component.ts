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
import {StudentCreationComponent} from "./role-creations/student-creation.component";
import {SignUpForm} from "../../../../common/util/models/user-form-models";
import {ExtractFromControl} from "../../../../common/util/type-utils";
import {ClassDropdown, ParentDropdown, SignUpData, User} from "../../../../common/util/models/user-models";
import {CalendarModule} from "primeng/calendar";
import {Class} from "../../../../common/util/models/class-models";

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
        StudentCreationComponent,
        CalendarModule
    ],
  templateUrl: './user-popup.component.html'
})
export class UserPopupComponent implements OnInit {
    @Input() userDialog!: boolean;
    @Input() parents!: User[];
    @Input() classes!: Class[];
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveUserEvent = new EventEmitter<SignUpData>();

    formGroup!: FormGroup<SignUpForm>;
    formGroupValues!: ExtractFromControl<SignUpForm>
    schools: { name: string }[] = [];

    ngOnInit(): void {
        this.formGroup = new FormGroup<SignUpForm>({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            /*phone: new FormControl('', Validators.required),
            publicEmail: new FormControl('', Validators.required),
            schoolEmail: new FormControl('', Validators.required),
            school: new FormControl('', Validators.required),
            residence: new FormControl('', Validators.required),
            birthplace: new FormControl('', Validators.required),
            birthdate: new FormControl(null, Validators.required),*/
            role: new FormControl(null, Validators.required),
            password: new FormControl('', Validators.required),
            parentId: new FormControl('', Validators.required),
            classId: new FormControl(0, Validators.required)
        });
        this.formGroupValues = this.formGroup.getRawValue() as ExtractFromControl<SignUpForm>;
        this.schools = [
            {name: 'Széchenyi István Gimnázium'},
            {name: 'Petőfi Sándor Általános Iskola'},
            {name: 'Budapesti Fazekas Mihály Gimnázium'}
        ];
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveStudent() {
        this.saveUserEvent.emit(this.formGroup.value as SignUpData);
    }

    isInputInvalid(formControlName: string) {
        return this.formGroup.get(formControlName)?.invalid && this.formGroup.get(formControlName)?.dirty;
    }

    get selectedRole() {
        return this.formGroup.controls.role.getRawValue();
    }

    parentChangeEvent(parentDropdown: ParentDropdown) {
        if (parentDropdown) {
            this.formGroup.controls.parentId.setValue(parentDropdown.uid);
        } else {
            this.formGroup.controls.parentId.setValue(null);
        }
    }

    classChangeEvent(classDropdown: ClassDropdown) {
        if (classDropdown) {
            this.formGroup.controls.classId.setValue(classDropdown.id);
        } else {
            this.formGroup.controls.classId.setValue(null);
        }
    }

    roleCreationValid() {
        /*this.formGroup.controls.parentId.clearValidators();
        this.formGroup.controls.parentId.updateValueAndValidity();
        this.formGroup.controls.classId.clearValidators();
        this.formGroup.controls.classId.updateValueAndValidity();*/
    }

    protected readonly Role = Role;
    protected readonly ROLE_TYPE = ROLE_TYPE;

    get formGroupIsInvalid() {
        return this.formGroup.invalid;
    }
}
