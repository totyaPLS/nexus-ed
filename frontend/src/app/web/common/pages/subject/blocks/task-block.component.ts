import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DatePipe, NgIf} from "@angular/common";
import {getEnumName, SubjectDetailType, TASK_TYPE} from "../../../util/enums/Commons";
import {RouterLink} from "@angular/router";
import {Announcement} from "../../../util/models/announcement-models";
import {NewAnnouncementPopupComponent} from "../components/new-announcement-popup.component";
import {NexusTimeModule} from "../../../util/date/nexus-time.module";

@Component({
  selector: 'app-task-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule,
        DatePipe,
        RouterLink,
        NewAnnouncementPopupComponent,
        NgIf,
        NexusTimeModule
    ],
  templateUrl: './task-block.component.html',
  styleUrl: './task-block.component.scss'
})
export class TaskBlockComponent {
    @Input() tasks!: Announcement[];
    @Input() classId!: number;
    @Input() subjectId!: number;
    protected readonly getEnumName = getEnumName;
    protected readonly TASK_TYPE = TASK_TYPE;

    announcementType = SubjectDetailType.TASKS;
    isDialogDisplayed = false;

    openNew() {
        this.isDialogDisplayed = true;
    }

    closeDialog() {
        this.isDialogDisplayed = false;
    }
}
