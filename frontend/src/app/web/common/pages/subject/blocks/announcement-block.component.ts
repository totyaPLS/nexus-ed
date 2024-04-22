import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Announcement} from "../../../util/models/announcement-models";
import {RouterLink} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";
import {NexRoleValidationModule} from "../../../../../config/auth/nex-role-validation.module";
import {NewAnnouncementPopupComponent} from "../components/new-announcement-popup.component";
import {SubjectDetailType} from "../../../util/enums/Commons";

@Component({
  selector: 'app-announcement-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule,
        RouterLink,
        DatePipe,
        NexRoleValidationModule,
        NewAnnouncementPopupComponent,
        NgIf
    ],
  templateUrl: './announcement-block.component.html',
  styleUrl: './announcement-block.component.scss'
})
export class AnnouncementBlockComponent {
    @Input() announcements!: Announcement[];
    @Input() classId!: number;
    @Input() subjectId!: number;

    announcementType = SubjectDetailType.ANNOUNCEMENTS;
    isDialogDisplayed = false;

    openNew() {
        this.isDialogDisplayed = true;
    }

    closeDialog() {
        this.isDialogDisplayed = false;
    }
}
