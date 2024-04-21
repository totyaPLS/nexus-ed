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
import {SubmittableTask} from "../../../../util/models/announcement-models";

@Component({
  selector: 'app-task-popup',
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
  templateUrl: './task-popup.component.html'
})
export class TaskPopupComponent implements OnInit {
    @Input() detailsDialog!: boolean;
    @Input() task!: SubmittableTask;
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveUserEvent = new EventEmitter<unknown>();

    ngOnInit(): void {
        console.log(this.task);
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveGrading() {
        this.saveUserEvent.emit();
    }
}
