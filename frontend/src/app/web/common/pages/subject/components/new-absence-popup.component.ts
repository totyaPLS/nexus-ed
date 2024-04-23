import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {CalendarModule} from "primeng/calendar";

@Component({
    selector: 'app-new-absence-popup',
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
    ],
    templateUrl: './new-absence-popup.component.html'
})
export class NewAbsencePopupComponent implements OnInit {
    @Input() absenceDialog!: boolean;
    @Input() classId!: number;
    @Input() subjectId!: number;
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveAbsenceEvent = new EventEmitter<unknown>();

    ngOnInit(): void {
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveAbsence() {
        this.saveAbsenceEvent.emit();
    }
}
