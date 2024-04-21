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
import {SubjectDetailType} from "../../../util/enums/Subject";

@Component({
  selector: 'app-new-announcement-popup',
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
  templateUrl: './new-announcement-popup.component.html'
})
export class NewAnnouncementPopupComponent implements OnInit {
    @Input() announcementDialog!: boolean;
    @Input() announcementType!: string;
    @Input() classId!: number;
    @Input() subjectId!: number;
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveAnnouncementEvent = new EventEmitter<unknown>();

    title!: string;

    ngOnInit(): void {
        this.title = (this.announcementType === SubjectDetailType.TASKS ? 'feladat' : 'közlemény');
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveGrading() {
        this.saveAnnouncementEvent.emit();
    }
}
