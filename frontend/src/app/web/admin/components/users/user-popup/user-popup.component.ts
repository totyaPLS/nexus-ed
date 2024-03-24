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
import {ParentDropdown, SignUpData, User} from "../../../../common/util/models/user-models";

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
        StudentCreationComponent
    ],
  templateUrl: './user-popup.component.html'
})
export class UserPopupComponent implements OnInit {
    @Input() userDialog!: boolean;
    @Input() parents!: User[];
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveUserEvent = new EventEmitter<SignUpData>();

    formGroup!: FormGroup<SignUpForm>;
    formGroupValues!: ExtractFromControl<SignUpForm>
    roleCreationFormIsInvalid = false;

    ngOnInit(): void {
        this.formGroup = new FormGroup<SignUpForm>({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            phone: new FormControl(''),
            publicEmail: new FormControl(''),
            schoolEmail: new FormControl(''),
            school: new FormControl(''),
            residence: new FormControl(''),
            birthplace: new FormControl(''),
            birthdate: new FormControl(new Date()),
            role: new FormControl(null, Validators.required),
            password: new FormControl('', Validators.required),
            parentId: new FormControl(''),
            classId: new FormControl(0)
        });
        this.formGroupValues = this.formGroup.getRawValue() as ExtractFromControl<SignUpForm>;
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
        }
    }

    formValidityChangeEvent(creationFormIsValid: boolean) {
        this.roleCreationFormIsInvalid = creationFormIsValid;
    }

    roleCreationValid() {
        this.roleCreationFormIsInvalid = false;
    }

    protected readonly Role = Role;
    protected readonly ROLE_TYPE = ROLE_TYPE;

    get formGroupIsInvalid() {
        return this.formGroup.invalid || this.roleCreationFormIsInvalid;
    }
}
