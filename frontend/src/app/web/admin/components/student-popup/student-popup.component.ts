import {Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {Student} from "../../../common/state/students.repository";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {StudentService} from "../../../common/rest/student.service";
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

    studentForm = this.createForm({
        firstName: '',
        lastName: '',
        password: '',
        student: false,
        teacher: false,
        formTeacher: false,
        admin: false
    });

    constructor(private studentService: StudentService,
                private fb: FormBuilder,
                private messageService: MessageService) {
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveStudent() {
        this.studentService.createStudent(this.studentForm.value as Student)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Sikeres', detail: 'Tanuló hozzáadva', life: 3000 });
                this.hideDialog();
            });
    }

    createForm(model: Omit<Student, 'id'>) {
        let formGroup = this.fb.group(model);
        formGroup.get('firstName')?.addValidators([Validators.required]);
        formGroup.get('lastName')?.addValidators([Validators.required]);
        formGroup.get('password')?.addValidators([Validators.required]);
        return formGroup;
    }

    isInputInvalid(formControlName: string) {
        return this.studentForm.get(formControlName)?.invalid && this.studentForm.get(formControlName)?.dirty;
    }
}
