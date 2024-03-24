import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {User} from "../../../../common/state/users.repository";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {Role, ROLE_TYPE} from "../../../../common/util/enums/Role";
import {StudentCreationComponent} from "./role-creations/student-creation.component";

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
export class UserPopupComponent {
    @Input() userDialog!: boolean;
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveUserEvent = new EventEmitter<User>();

    userForm = this.createForm({
        firstName: '',
        lastName: '',
        password: '',
        role: '',
    });

    constructor(private fb: FormBuilder) {
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveStudent() {
        this.saveUserEvent.emit(this.userForm.value as User);
    }

    createForm(model: Omit<User, 'uid' | 'token'>) {
        let formGroup = this.fb.group(model);
        formGroup.get('firstName')?.addValidators([Validators.required]);
        formGroup.get('lastName')?.addValidators([Validators.required]);
        formGroup.get('password')?.addValidators([Validators.required]);
        formGroup.get('role')?.addValidators([Validators.required]);
        return formGroup;
    }

    isInputInvalid(formControlName: string) {
        return this.userForm.get(formControlName)?.invalid && this.userForm.get(formControlName)?.dirty;
    }

    get selectedRole() {
        return this.userForm.get('role')?.getRawValue();
    }

    protected readonly Role = Role;
    protected readonly ROLE_TYPE = ROLE_TYPE;
}
