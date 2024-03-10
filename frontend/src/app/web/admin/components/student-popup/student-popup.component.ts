import {Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {User} from "../../../common/state/users.repository";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {UserService} from "../../../common/rest/user.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MessageService} from "primeng/api";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-student-popup',
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
        CheckboxModule
    ],
  templateUrl: './student-popup.component.html'
})
export class StudentPopupComponent {
    @Input() studentDialog!: boolean;
    @Output() closeDialogEvent = new EventEmitter<void>();

    destroyRef = inject(DestroyRef);

    userForm = this.createForm({
        firstName: '',
        lastName: '',
        password: '',
        admin: false,
        student: false,
        teacher: false,
        formTeacher: false,
    });

    constructor(private studentService: UserService,
                private fb: FormBuilder,
                private messageService: MessageService) {
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveStudent() {
        this.studentService.createUser(this.userForm.value as User)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Sikeres', detail: 'Tanuló hozzáadva', life: 3000 });
                this.hideDialog();
            });
    }

    createForm(model: Omit<User, 'uid'>) {
        let formGroup = this.fb.group(model);
        formGroup.get('firstName')?.addValidators([Validators.required]);
        formGroup.get('lastName')?.addValidators([Validators.required]);
        formGroup.get('password')?.addValidators([Validators.required]);
        return formGroup;
    }

    isInputInvalid(formControlName: string) {
        return this.userForm.get(formControlName)?.invalid && this.userForm.get(formControlName)?.dirty;
    }
}
