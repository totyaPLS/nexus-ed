import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Absence} from "../../../util/models/absence-models";
import {ABSENCE_STATUS, getEnumName} from "../../../util/enums/Commons";
import {DatePipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NewAnnouncementPopupComponent} from "../components/new-announcement-popup.component";
import {NewAbsencePopupComponent} from "../components/new-absence-popup.component";

@Component({
  selector: 'app-absence-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule,
        DatePipe,
        RouterLink,
        NewAnnouncementPopupComponent,
        NgIf,
        NewAbsencePopupComponent
    ],
  templateUrl: './absence-block.component.html',
  styleUrl: './absence-block.component.scss'
})
export class AbsenceBlockComponent {
    @Input() absences!: Absence[];
    @Input() classId!: number;
    @Input() subjectId!: number;
    protected readonly getEnumName = getEnumName;
    protected readonly ABSENCE_STATUS = ABSENCE_STATUS;
    isDialogDisplayed = false;

    openNew() {
        this.isDialogDisplayed = true;
    }

    closeDialog() {
        this.isDialogDisplayed = false;
    }
}
